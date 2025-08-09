import { Controller, Get, Param, Query, Post, Patch, Delete, Body, UseGuards, UploadedFiles, UseInterceptors, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import type { Response } from 'express';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all published products (with filters)' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully', type: [Product] })
  async findAll(
    @Query('categoryId') categoryId?: string,
    @Query('status') status?: string,
    @Query('published') published?: string,
    @Query('featured') featured?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('inStock') inStock?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
  ): Promise<Product[]> {
    return this.productsService.findAllWithFilters({
      categoryId: categoryId || undefined,
      status: status || undefined,
      published: published != null ? published === 'true' : undefined,
      featured: featured != null ? featured === 'true' : undefined,
      minPrice: minPrice != null ? Number(minPrice) : undefined,
      maxPrice: maxPrice != null ? Number(maxPrice) : undefined,
      inStock: inStock != null ? inStock === 'true' : undefined,
      sortBy: sortBy || undefined,
      sortOrder: sortOrder || undefined,
    });
  }

  @Get('export-file')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Export products as CSV/XLSX (Admin only)' })
  async export(
    @Query('format') format: 'csv' | 'xlsx' = 'xlsx',
    @Query('filename') filename: string = 'products',
    @Res() res: Response,
  ) {
    const buffer = await this.productsService.exportAll(format);
    const mime = format === 'csv' ? 'text/csv; charset=utf-8' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const name = `${filename}.${format}`;
    res.setHeader('Content-Type', mime);
    res.setHeader('Content-Disposition', `attachment; filename=\"${name}\"`);
    res.send(buffer);
  }

  @Get('featured')
  @Public()
  @ApiOperation({ summary: 'Get featured products' })
  @ApiResponse({ status: 200, description: 'Featured products retrieved successfully', type: [Product] })
  async findFeatured(): Promise<Product[]> {
    return this.productsService.findFeatured();
  }

  @Get('search')
  @Public()
  @ApiOperation({ summary: 'Search products' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully', type: [Product] })
  async search(@Query('q') query: string): Promise<Product[]> {
    return this.productsService.search(query);
  }

  @Get('category/:categoryId')
  @Public()
  @ApiOperation({ summary: 'Get products by category' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully', type: [Product] })
  async findByCategory(@Param('categoryId') categoryId: string): Promise<Product[]> {
    return this.productsService.findByCategory(categoryId);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string): Promise<Product> {
    await this.productsService.incrementViews(id);
    return this.productsService.findOne(id);
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get product by slug' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findBySlug(@Param('slug') slug: string): Promise<Product> {
    const product = await this.productsService.findBySlug(slug);
    await this.productsService.incrementViews(product.id);
    return product;
  }

  @Get(':id/related')
  @Public()
  @ApiOperation({ summary: 'Get related products' })
  @ApiResponse({ status: 200, description: 'Related products retrieved successfully', type: [Product] })
  async findRelated(@Param('id') id: string): Promise<Product[]> {
    const product = await this.productsService.findOne(id);
    if (!product.categoryId) return [];
    return this.productsService.findRelated(id, product.categoryId);
  }

  // Admin endpoints
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product (Admin only)' })
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.create(dto);
  }

  @Post(':id/images')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload images for a product (Admin only)' })
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: join(process.cwd(), 'uploads'),
      filename: (req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, unique + extname(file.originalname));
      }
    })
  }))
  async uploadImages(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const mapped = (files || []).map((f) => ({
      filename: f.filename,
      path: f.path,
      url: `/uploads/${f.filename}`,
    }));
    return this.productsService.addImages(id, mapped);
  }

  @Patch(':id/images/:imageId/primary')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set product primary image' })
  async setPrimaryImage(@Param('id') id: string, @Param('imageId') imageId: string) {
    await this.productsService.setPrimaryImage(id, imageId);
    return { message: 'Primary image set' };
  }

  @Delete(':id/images/:imageId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product image' })
  async deleteImage(@Param('id') id: string, @Param('imageId') imageId: string) {
    await this.productsService.removeImage(id, imageId);
    return { message: 'Image deleted' };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product (Admin only)' })
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto): Promise<Product> {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product (Admin only)' })
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    await this.productsService.remove(id);
    return { success: true };
  }

  @Post('bulk-delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bulk delete products (Admin only)' })
  async bulkDelete(@Body('ids') ids: string[]): Promise<{ success: boolean; deleted: number }> {
    const deleted = await this.productsService.bulkDelete(ids);
    return { success: true, deleted };
  }

  @Patch(':id/toggle-featured')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle featured status (Admin only)' })
  async toggleFeatured(@Param('id') id: string): Promise<Product> {
    return this.productsService.toggleFeatured(id);
  }

  @Patch(':id/toggle-published')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle published status (Admin only)' })
  async togglePublished(@Param('id') id: string): Promise<Product> {
    return this.productsService.togglePublished(id);
  }
}
 