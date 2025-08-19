import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Field, ObjectType, ID, Float } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { CartItem } from './cart-item.entity';

@ObjectType()
@Entity('carts')
export class Cart {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sessionId?: string; // للمستخدمين غير المسجلين

  @Field({ nullable: true })
  @Column({ nullable: true })
  userId?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.carts, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Field(() => [CartItem])
  @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
  items: CartItem[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual fields
  @Field(() => Float)
  get subtotal(): number {
    return this.items?.reduce((total, item) => total + item.total, 0) || 0;
  }

  @Field()
  get itemsCount(): number {
    return this.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  }

  @Field()
  get uniqueItemsCount(): number {
    return this.items?.length || 0;
  }
}
 