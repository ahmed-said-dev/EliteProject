import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { Public } from '../auth/decorators/public.decorator';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category])
  @Public()
  async categories(): Promise<Category[]> {
    return this.categoriesService.findActive();
  }

  @Query(() => Category)
  @Public()
  async category(@Args('id', { type: () => ID }) id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Query(() => [Category])
  @Public()
  async rootCategories(): Promise<Category[]> {
    return this.categoriesService.findRootCategories();
  }
}

 