import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Product } from './product.entity';

@ObjectType()
@Entity('product_images')
export class ProductImage {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  url: string;

  @Field()
  @Column()
  filename: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  altText?: string;

  @Field(() => Int)
  @Column({ default: 0 })
  sortOrder: number;

  @Field()
  @Column({ default: false })
  isPrimary: boolean;

  @Field()
  @Column({ nullable: true })
  productId: string;

  @Field(() => Product)
  @ManyToOne(() => Product, product => product.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
 