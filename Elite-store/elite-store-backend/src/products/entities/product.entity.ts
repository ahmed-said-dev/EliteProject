import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Field, ObjectType, ID, Float, Int, registerEnumType } from '@nestjs/graphql';
import { Category } from '../../categories/entities/category.entity';
import { ProductImage } from './product-image.entity';
import { Review } from './review.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';
import { CartItem } from '../../cart/entities/cart-item.entity';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued'
}

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
});

@ObjectType()
@Entity('products')
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  slug: string;

  @Field()
  @Column('text')
  description: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  shortDescription?: string;

  @Field()
  @Column()
  sku: string;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  salePrice?: number;

  @Field(() => Int)
  @Column({ default: 0 })
  stockQuantity: number;

  @Field()
  @Column({ default: true })
  manageStock: boolean;

  @Field(() => ProductStatus)
  @Column({
    type: 'varchar',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE
  })
  status: ProductStatus;

  @Field()
  @Column({ default: true })
  featured: boolean;

  @Field()
  @Column({ default: true })
  published: boolean;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  weight?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dimensions?: string;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  metaTitle?: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  metaDescription?: string;

  @Field()
  @Column({ default: 0 })
  viewsCount: number;

  @Field()
  @Column({ default: 0 })
  salesCount: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  categoryId?: string;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, category => category.products, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category?: Category;

  @Field(() => [ProductImage], { nullable: true })
  @OneToMany(() => ProductImage, image => image.product, { cascade: true })
  images?: ProductImage[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, review => review.product)
  reviews?: Review[];

  @Field(() => [OrderItem], { nullable: true })
  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems?: OrderItem[];

  @Field(() => [CartItem], { nullable: true })
  @OneToMany(() => CartItem, cartItem => cartItem.product)
  cartItems?: CartItem[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual fields
  @Field(() => Float)
  get finalPrice(): number {
    return this.salePrice && this.salePrice < this.price ? this.salePrice : this.price;
  }

  @Field()
  get inStock(): boolean {
    if (!this.manageStock) return true;
    return this.stockQuantity > 0;
  }

  @Field(() => Float)
  get averageRating(): number {
    if (!this.reviews || this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / this.reviews.length) * 10) / 10;
  }

  @Field(() => Int)
  get reviewsCount(): number {
    return this.reviews?.length || 0;
  }

  @Field()
  get isOnSale(): boolean {
    return !!(this.salePrice && this.salePrice < this.price);
  }

  @Field(() => Float, { nullable: true })
  get discountPercentage(): number | null {
    if (!this.isOnSale || !this.salePrice) return null;
    return Math.round(((this.price - this.salePrice) / this.price) * 100);
  }
}
 