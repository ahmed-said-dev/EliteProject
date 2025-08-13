import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class RefundOrderDto {
  @ApiProperty({ required: false, description: 'Refund amount; if omitted, full refund' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;
}


