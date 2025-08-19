import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { User, UserRole, UserStatus } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Query(() => [User])
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  async searchUsers(@Args('query') query: string): Promise<User[]> {
    return this.usersService.searchUsers(query);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto, currentUser);
  }

  @Mutation(() => String)
  async updateUserPassword(
    @Args('id', { type: () => ID }) id: string,
    @Args('currentPassword') currentPassword: string,
    @Args('newPassword') newPassword: string,
    @CurrentUser() currentUser: User,
  ): Promise<string> {
    const result = await this.usersService.updatePassword(id, currentPassword, newPassword, currentUser);
    return result.message;
  }

  @Mutation(() => User)
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateUserStatus(
    @Args('id', { type: () => ID }) id: string,
    @Args('status', { type: () => UserStatus }) status: UserStatus,
  ): Promise<User> {
    return this.usersService.updateStatus(id, status);
  }

  @Mutation(() => User)
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateUserRole(
    @Args('id', { type: () => ID }) id: string,
    @Args('role', { type: () => UserRole }) role: UserRole,
  ): Promise<User> {
    return this.usersService.updateRole(id, role);
  }

  @Mutation(() => String)
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteUser(@Args('id', { type: () => ID }) id: string): Promise<string> {
    const result = await this.usersService.remove(id);
    return result.message;
  }
}
 