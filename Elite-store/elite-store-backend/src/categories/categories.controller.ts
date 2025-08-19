import { Controller, Get, Param, Post, Patch, Delete, Body, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReorderCategoriesDto } from './dto/reorder-categories.dto';
import { AttachProductsDto } from './dto/attach-products.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all active categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully', type: [Category] })
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findActive();
  }

  @Get('root')
  @Public()
  @ApiOperation({ summary: 'Get root categories' })
  @ApiResponse({ status: 200, description: 'Root categories retrieved successfully', type: [Category] })
  async findRootCategories(): Promise<Category[]> {
    return this.categoriesService.findRootCategories();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully', type: Category })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get category by slug' })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully', type: Category })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findBySlug(@Param('slug') slug: string): Promise<Category> {
    return this.categoriesService.findBySlug(slug);
  }

  // Admin endpoints
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new category (Admin only)' })
  async create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a category (Admin only)' })
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<Category> {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a category (Admin only)' })
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    await this.categoriesService.remove(id);
    return { success: true };
  }

  @Patch('reorder')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reorder categories and update parent relations (Admin only)' })
  async reorder(@Body() dto: ReorderCategoriesDto): Promise<{ success: boolean }> {
    await this.categoriesService.reorder(dto.nodes);
    return { success: true };
  }

  @Post(':id/image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload/replace category image (Admin only)' })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: join(process.cwd(), 'uploads'),
      filename: (req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, unique + extname(file.originalname));
      },
    }),
  }))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const payload = file ? { filename: file.filename, url: `/uploads/${file.filename}`, path: file.path } : undefined;
    return this.categoriesService.setImage(id, payload);
  }

  @Post(':id/attach-products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Attach products to a category (Admin only)' })
  async attachProducts(@Param('id') id: string, @Body() dto: AttachProductsDto) {
    return this.categoriesService.attachProducts(id, dto.productIds);
  }

  @Post(':id/detach-products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Detach products from a category (Admin only)' })
  async detachProducts(@Param('id') id: string, @Body() dto: AttachProductsDto) {
    return this.categoriesService.detachProducts(id, dto.productIds);
  }
}

 