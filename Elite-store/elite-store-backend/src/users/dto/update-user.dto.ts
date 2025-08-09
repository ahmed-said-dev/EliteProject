import { IsString, IsOptional, IsEmail, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
    required: false,
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    required: false,
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastName?: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+1234567890',
    required: false,
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'User address',
    example: '123 Main St, City, Country',
    required: false,
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'User city',
    example: 'New York',
    required: false,
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'User country',
    example: 'United States',
    required: false,
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  country?: string;
}
 