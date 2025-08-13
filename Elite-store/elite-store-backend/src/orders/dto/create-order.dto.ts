import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../entities/order.entity';

export class OrderItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productSku: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateOrderFromCartDto {
  @ApiProperty({ enum: PaymentMethod, default: PaymentMethod.STRIPE })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ required: false, description: 'Stripe payment_intent id when using STRIPE' })
  @IsOptional()
  @IsString()
  paymentIntentId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customerFirstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customerLastName: string;

  @ApiProperty()
  @IsEmail()
  customerEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customerPhone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shippingAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shippingCity: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shippingCountry: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  billingAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  billingCity?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  billingCountry?: string;

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  shippingCost?: number = 0;

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  taxAmount?: number = 0;

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountAmount?: number = 0;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}


