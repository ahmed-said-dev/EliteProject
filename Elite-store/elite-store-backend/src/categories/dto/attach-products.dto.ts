import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class AttachProductsDto {
  @ApiProperty({ type: [String], example: ['uuid1', 'uuid2'] })
  @IsArray()
  @IsString({ each: true })
  productIds: string[];
}



