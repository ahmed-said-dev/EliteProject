import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';

@ObjectType()
@Entity('categories')
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column({ unique: true })
  slug: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image?: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @Column({ default: 0 })
  sortOrder: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  parentId?: string;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, category => category.children, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent?: Category;

  @Field(() => [Category], { nullable: true })
  @OneToMany(() => Category, category => category.parent)
  children?: Category[];

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, product => product.category)
  products?: Product[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual field for product count
  @Field()
  get productCount(): number {
    return this.products?.length || 0;
  }
}
 