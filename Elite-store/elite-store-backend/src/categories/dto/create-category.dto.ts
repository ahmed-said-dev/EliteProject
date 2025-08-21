import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Cats', description: 'Category display name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'cats', description: 'URL-friendly unique slug' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ required: false, example: 'All products for cats' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, example: 'uuid-of-parent' })
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiProperty({ required: false, example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}








