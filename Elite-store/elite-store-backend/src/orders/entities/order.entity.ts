import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Field, ObjectType, ID, Float, registerEnumType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

export enum PaymentMethod {
  CASH_ON_DELIVERY = 'cash_on_delivery',
  CREDIT_CARD = 'credit_card',
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer'
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

registerEnumType(PaymentStatus, {
  name: 'PaymentStatus',
});

registerEnumType(PaymentMethod, {
  name: 'PaymentMethod',
});

@ObjectType()
@Entity('orders')
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  orderNumber: string;

  @Field(() => OrderStatus)
  @Column({
    type: 'varchar',
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status: OrderStatus;

  @Field(() => PaymentStatus)
  @Column({
    type: 'varchar',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING
  })
  paymentStatus: PaymentStatus;

  @Field(() => PaymentMethod)
  @Column({
    type: 'varchar',
    enum: PaymentMethod,
    default: PaymentMethod.CASH_ON_DELIVERY
  })
  paymentMethod: PaymentMethod;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  shippingCost: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  taxAmount: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  discountAmount: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Field()
  @Column()
  customerEmail: string;

  @Field()
  @Column()
  customerPhone: string;

  @Field()
  @Column()
  customerFirstName: string;

  @Field()
  @Column()
  customerLastName: string;

  @Field()
  @Column()
  shippingAddress: string;

  @Field()
  @Column()
  shippingCity: string;

  @Field()
  @Column()
  shippingCountry: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  billingAddress?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  billingCity?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  billingCountry?: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  notes?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  trackingNumber?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  paymentTransactionId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  shippedAt?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  deliveredAt?: Date;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual fields
  @Field()
  get customerFullName(): string {
    return `${this.customerFirstName} ${this.customerLastName}`;
  }

  @Field()
  get itemsCount(): number {
    return this.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  }
}
 