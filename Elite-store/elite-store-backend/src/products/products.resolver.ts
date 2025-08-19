import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Public } from '../auth/decorators/public.decorator';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  @Public()
  async products(): Promise<Product[]> {
    return this.productsService.findPublished();
  }

  @Query(() => Product)
  @Public()
  async product(@Args('id', { type: () => ID }) id: string): Promise<Product> {
    await this.productsService.incrementViews(id);
    return this.productsService.findOne(id);
  }

  @Query(() => [Product])
  @Public()
  async featuredProducts(): Promise<Product[]> {
    return this.productsService.findFeatured();
  }

  @Query(() => [Product])
  @Public()
  async searchProducts(@Args('query') query: string): Promise<Product[]> {
    return this.productsService.search(query);
  }
}

 