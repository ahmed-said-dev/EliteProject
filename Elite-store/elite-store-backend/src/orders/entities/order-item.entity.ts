import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType, ID, Int, Float } from '@nestjs/graphql';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@ObjectType()
@Entity('order_items')
export class OrderItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  price: number; // سعر المنتج وقت الطلب

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  total: number; // price * quantity

  @Field()
  @Column()
  productName: string; // نسخة من اسم المنتج وقت الطلب

  @Field()
  @Column()
  productSku: string; // نسخة من SKU وقت الطلب

  @Field({ nullable: true })
  @Column({ nullable: true })
  productImage?: string; // نسخة من صورة المنتج وقت الطلب

  @Field()
  @Column()
  orderId: string;

  @Field(() => Order)
  @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Field()
  @Column()
  productId: string;

  @Field(() => Product)
  @ManyToOne(() => Product, product => product.orderItems)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
 