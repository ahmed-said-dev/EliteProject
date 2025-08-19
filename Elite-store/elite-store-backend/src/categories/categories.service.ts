import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, In } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReorderNodeDto } from './dto/reorder-categories.dto';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['products', 'children', 'parent'],
      order: { sortOrder: 'ASC', name: 'ASC' },
    });
  }

  async findActive(): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { isActive: true },
      relations: ['products', 'children'],
      order: { sortOrder: 'ASC', name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products', 'children', 'parent'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async findBySlug(slug: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { slug },
      relations: ['products', 'children', 'parent'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async findRootCategories(): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { parentId: IsNull(), isActive: true },
      relations: ['children'],
      order: { sortOrder: 'ASC', name: 'ASC' },
    });
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const entity = this.categoryRepository.create({
      name: dto.name,
      slug: dto.slug,
      description: dto.description,
      parentId: dto.parentId,
      isActive: dto.isActive ?? true,
    });
    return this.categoryRepository.save(entity);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    Object.assign(category, dto);
    return this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }

  async reorder(nodes: ReorderNodeDto[]): Promise<void> {
    const toUpdate: Partial<Category>[] = nodes.map((n) => ({
      id: n.id,
      sortOrder: n.sortOrder,
      parentId: n.parentId ?? undefined,
    }));
    await this.categoryRepository.save(toUpdate as any);
  }

  async setImage(id: string, file?: { filename: string; url: string; path: string } | undefined): Promise<Category> {
    const category = await this.findOne(id);
    category.image = file?.url ?? undefined;
    return this.categoryRepository.save(category);
  }

  async attachProducts(categoryId: string, productIds: string[]): Promise<{ success: boolean; updated: number }> {
    if (!productIds?.length) return { success: true, updated: 0 };
    await this.categoryRepository.manager.update(Product, { id: In(productIds) }, { categoryId });
    return { success: true, updated: productIds.length };
  }

  async detachProducts(categoryId: string, productIds: string[]): Promise<{ success: boolean; updated: number }> {
    if (!productIds?.length) return { success: true, updated: 0 };
    await this.categoryRepository.manager.update(
      Product,
      { id: In(productIds), categoryId },
      { categoryId: null as any },
    );
    return { success: true, updated: productIds.length };
  }
}

 