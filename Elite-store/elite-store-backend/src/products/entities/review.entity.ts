import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType, ID, Int, registerEnumType } from '@nestjs/graphql';
import { Product } from './product.entity';
import { User } from '../../users/entities/user.entity';

export enum ReviewStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

registerEnumType(ReviewStatus, {
  name: 'ReviewStatus',
});

@ObjectType()
@Entity('reviews')
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  rating: number; // 1-5 stars

  @Field()
  @Column()
  title: string;

  @Field()
  @Column('text')
  comment: string;

  @Field(() => ReviewStatus)
  @Column({
    type: 'varchar',
    enum: ReviewStatus,
    default: ReviewStatus.PENDING
  })
  status: ReviewStatus;

  @Field()
  @Column({ default: false })
  verified: boolean; // تم التحقق من أن المستخدم اشترى المنتج

  @Field()
  @Column({ default: 0 })
  helpfulCount: number; // عدد الأشخاص الذين وجدوا المراجعة مفيدة

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field()
  @Column()
  productId: string;

  @Field(() => Product)
  @ManyToOne(() => Product, product => product.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
 