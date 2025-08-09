import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class AuthResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @Field()
  accessToken: string;

  @ApiProperty({
    description: 'User information',
    type: () => User,
  })
  @Field(() => User)
  user: User;

  @ApiProperty({
    description: 'Token expiration time in seconds',
    example: 604800,
  })
  @Field()
  expiresIn: number;

  @ApiProperty({
    description: 'Token type',
    example: 'Bearer',
  })
  @Field()
  tokenType: string;
}
 