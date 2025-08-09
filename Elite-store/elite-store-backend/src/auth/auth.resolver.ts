import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  @Public()
  async register(@Args('registerInput') registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(registerDto);
  }

  @Mutation(() => AuthResponse)
  @Public()
  async login(@Args('loginInput') loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Mutation(() => String)
  @Public()
  async verifyEmail(@Args('token') token: string): Promise<string> {
    const result = await this.authService.verifyEmail(token);
    return result.message;
  }

  @Mutation(() => String)
  @Public()
  async requestPasswordReset(@Args('email') email: string): Promise<string> {
    const result = await this.authService.requestPasswordReset(email);
    return result.message;
  }

  @Mutation(() => String)
  @Public()
  async resetPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string,
  ): Promise<string> {
    const result = await this.authService.resetPassword(token, newPassword);
    return result.message;
  }

  @Mutation(() => AuthResponse)
  @UseGuards(JwtAuthGuard)
  async refreshToken(@CurrentUser() user: User): Promise<AuthResponse> {
    return this.authService.refreshToken(user);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
 