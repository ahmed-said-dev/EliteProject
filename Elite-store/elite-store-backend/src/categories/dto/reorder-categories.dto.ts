import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ReorderNodeDto {
  @ApiProperty({ example: 'uuid-category-id' })
  id: string;

  @ApiProperty({ example: 1 })
  sortOrder: number;

  @ApiProperty({ example: null })
  parentId: string | null;
}

export class ReorderCategoriesDto {
  @ApiProperty({ type: [ReorderNodeDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReorderNodeDto)
  nodes: ReorderNodeDto[];
}






