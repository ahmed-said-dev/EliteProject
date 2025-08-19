import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like, ILike, Not } from 'typeorm';
import { Product, ProductStatus } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { Review } from './entities/review.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as XLSX from 'xlsx';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async findAll(options?: FindManyOptions<Product>): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category', 'images', 'reviews'],
      order: { createdAt: 'DESC' },
      ...options,
    });
  }

  async findPublished(): Promise<Product[]> {
    return this.productRepository.find({
      where: { published: true, status: ProductStatus.ACTIVE },
      relations: ['category', 'images', 'reviews'],
      order: { createdAt: 'DESC' },
    });
  }

  // Advanced filtering for list endpoint
  async findAllWithFilters(filters: {
    search?: string; // ignored here to keep search-by-name in /search endpoint
    categoryId?: string;
    status?: string;
    published?: boolean;
    featured?: boolean;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
  }): Promise<Product[]> {
    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'images');

    // Only public products by default
    if (filters.published === undefined) {
      qb.andWhere('product.published = :pub', { pub: true });
    } else {
      qb.andWhere('product.published = :pub', { pub: filters.published });
    }

    if (!filters.status) {
      qb.andWhere('product.status = :status', { status: ProductStatus.ACTIVE });
    } else {
      qb.andWhere('product.status = :status', { status: filters.status });
    }

    if (filters.categoryId) {
      qb.andWhere('product.categoryId = :categoryId', { categoryId: filters.categoryId });
    }

    if (filters.featured !== undefined) {
      qb.andWhere('product.featured = :featured', { featured: filters.featured });
    }

    if (typeof filters.minPrice === 'number' && !isNaN(filters.minPrice)) {
      qb.andWhere('product.price >= :minPrice', { minPrice: filters.minPrice });
    }
    if (typeof filters.maxPrice === 'number' && !isNaN(filters.maxPrice)) {
      qb.andWhere('product.price <= :maxPrice', { maxPrice: filters.maxPrice });
    }

    if (filters.inStock !== undefined) {
      if (filters.inStock) qb.andWhere('product.stockQuantity > 0');
      else qb.andWhere('product.stockQuantity <= 0');
    }

    const allowedSortFields = ['createdAt', 'name', 'price', 'stockQuantity', 'salesCount', 'viewsCount'];
    const sortBy = filters.sortBy && allowedSortFields.includes(filters.sortBy) ? filters.sortBy : 'createdAt';
    const sortOrder = (filters.sortOrder === 'ASC' || filters.sortOrder === 'DESC') ? filters.sortOrder : 'DESC';
    qb.orderBy(`product.${sortBy}`, sortOrder);

    return qb.getMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'images', 'reviews', 'reviews.user'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['category', 'images', 'reviews', 'reviews.user'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async search(query: string): Promise<Product[]> {
    const q = (query || '').trim();
    if (!q) {
      return this.findPublished();
    }
    return this.productRepository.find({
      where: {
        name: ILike(`%${q}%`),
        published: true,
        status: ProductStatus.ACTIVE,
      },
      relations: ['category', 'images'],
      order: { salesCount: 'DESC', createdAt: 'DESC' },
      take: 50,
    });
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { categoryId, published: true, status: ProductStatus.ACTIVE },
      relations: ['category', 'images', 'reviews'],
      order: { createdAt: 'DESC' },
    });
  }

  async findFeatured(): Promise<Product[]> {
    return this.productRepository.find({
      where: { featured: true, published: true, status: ProductStatus.ACTIVE },
      relations: ['category', 'images', 'reviews'],
      order: { salesCount: 'DESC' },
      take: 12,
    });
  }

  async findRelated(productId: string, categoryId: string): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        categoryId,
        published: true,
        status: ProductStatus.ACTIVE,
        id: Not(productId), // Exclude current product
      },
      relations: ['category', 'images'],
      order: { salesCount: 'DESC' },
      take: 6,
    });
  }

  async incrementViews(id: string): Promise<void> {
    await this.productRepository.increment({ id }, 'viewsCount', 1);
  }

  async incrementSales(id: string, quantity: number): Promise<void> {
    await this.productRepository.increment({ id }, 'salesCount', quantity);
  }

  async getStats(): Promise<{
    total: number;
    published: number;
    draft: number;
    featured: number;
    outOfStock: number;
  }> {
    const [total, published, featured, outOfStock] = await Promise.all([
      this.productRepository.count(),
      this.productRepository.count({ where: { published: true, status: ProductStatus.ACTIVE } }),
      this.productRepository.count({ where: { featured: true } }),
      this.productRepository.count({ where: { status: ProductStatus.OUT_OF_STOCK } }),
    ]);

    return {
      total,
      published,
      draft: total - published,
      featured,
      outOfStock,
    };
  }

  async getTopSelling(limit: number = 5): Promise<Product[]> {
    return this.productRepository.find({
      order: { salesCount: 'DESC' },
      take: limit,
    });
  }

  async getLowStock(limit: number = 10, threshold: number = 5): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .where('product.stockQuantity <= :threshold', { threshold })
      .orderBy('product.stockQuantity', 'ASC')
      .addOrderBy('product.name', 'ASC')
      .limit(limit)
      .getMany();
  }

  async create(dto: CreateProductDto): Promise<Product> {
    try {
      // Pre-check unique slug to return a clear error (avoids generic 500)
      if (dto.slug) {
        const exists = await this.productRepository.findOne({ where: { slug: dto.slug } });
        if (exists) {
          throw new BadRequestException('Slug already exists');
        }
      }

      const product = this.productRepository.create({
        ...dto,
        featured: dto.featured ?? false,
        published: dto.published ?? true,
        stockQuantity: dto.stockQuantity ?? 0,
        status: dto.status ?? ProductStatus.ACTIVE,
      });
      // Normalize numeric fields to avoid numeric overflow
      if (product.price != null) product.price = Number(product.price);
      if (product.salePrice != null) product.salePrice = Number(product.salePrice);
      if (product.weight != null) product.weight = Number(product.weight);
      if (Number.isNaN(product.weight as any)) product.weight = null as unknown as number;
      return await this.productRepository.save(product);
    } catch (error: any) {
      // Handle unique constraint (e.g., duplicate slug)
      if (error?.code === '23505') {
        throw new BadRequestException('Product with same unique field already exists (e.g., slug)');
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async bulkDelete(ids: string[]): Promise<number> {
    const res = await this.productRepository.delete(ids);
    return res.affected ?? 0;
  }

  async toggleFeatured(id: string): Promise<Product> {
    const product = await this.findOne(id);
    product.featured = !product.featured;
    return this.productRepository.save(product);
  }

  async togglePublished(id: string): Promise<Product> {
    const product = await this.findOne(id);
    product.published = !product.published;
    return this.productRepository.save(product);
  }

  // Images
  async addImages(productId: string, files: Array<{ filename: string; path: string; url: string }>, primaryIndex?: number | null): Promise<ProductImage[]> {
    const product = await this.findOne(productId);
    const created: ProductImage[] = [];

    // Determine if any existing primary
    const hasPrimary = (product.images || []).some(img => img.isPrimary);

    for (let index = 0; index < files.length; index++) {
      const f = files[index];
      const image = this.productImageRepository.create({
        productId: product.id,
        filename: f.filename,
        url: f.url,
        isPrimary: false,
        sortOrder: (product.images?.length || 0) + index,
      });
      const saved = await this.productImageRepository.save(image);
      created.push(saved);
    }

    if (!hasPrimary) {
      // If product had no primary, set first uploaded (or by primaryIndex) to primary
      const indexToPrimary = primaryIndex != null && primaryIndex >= 0 && primaryIndex < created.length ? primaryIndex : 0;
      const target = created[indexToPrimary];
      if (target) {
        await this.productImageRepository.update({ productId: product.id }, { isPrimary: false });
        await this.productImageRepository.update({ id: target.id }, { isPrimary: true });
      }
    }

    return created;
  }

  async removeImage(productId: string, imageId: string): Promise<void> {
    const img = await this.productImageRepository.findOne({ where: { id: imageId, productId } });
    if (!img) throw new NotFoundException('Image not found');
    await this.productImageRepository.delete(img.id);
  }

  async setPrimaryImage(productId: string, imageId: string): Promise<void> {
    await this.findOne(productId); // ensure product exists
    await this.productImageRepository.update({ productId }, { isPrimary: false });
    await this.productImageRepository.update({ id: imageId, productId }, { isPrimary: true });
  }

  // Export all products into CSV or XLSX (Buffer)
  async exportAll(format: 'csv' | 'xlsx' = 'xlsx'): Promise<Buffer> {
    const products = await this.productRepository.find({
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });

    const rows = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category ? p.category.name : '',
      price: p.price ?? '',
      salePrice: p.salePrice ?? '',
      stockQuantity: p.stockQuantity ?? 0,
      featured: !!p.featured,
      published: !!p.published,
      status: p.status,
      createdAt: p.createdAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

    if (format === 'csv') {
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      return Buffer.from(csv, 'utf8');
    }
    // default to xlsx
    const wbout = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    return wbout as Buffer;
  }
}
 