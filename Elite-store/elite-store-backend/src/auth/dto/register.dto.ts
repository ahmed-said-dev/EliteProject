import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @Field()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'User password (minimum 8 characters)',
    example: 'Password123!',
    minLength: 8,
  })
  @Field()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password must not exceed 128 characters' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    {
      message: 'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  password: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @Field()
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @Field()
  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastName: string;

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
 