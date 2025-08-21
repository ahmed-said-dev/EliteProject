import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus, PaymentMethod, PaymentStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { EmailsService } from '../emails/emails.service';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { CreateOrderFromCartDto, OrderItemDto } from './dto/create-order.dto';
import { v4 as uuidv4 } from 'uuid';
import { PaymentsService } from '../payments/payments.service';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private emailsService: EmailsService,
    private paymentsService: PaymentsService,
  ) {}

  async findAll(status?: OrderStatus, paymentStatus?: PaymentStatus): Promise<Order[]> {
    const where: any = {};
    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;

    return this.orderRepository.find({
      where,
      relations: ['user', 'items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findUserOrders(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { userId },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.findOne(id);
    
    order.status = status;
    
    if (status === OrderStatus.SHIPPED && !order.shippedAt) {
      order.shippedAt = new Date();
    }
    
    if (status === OrderStatus.DELIVERED && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }
    
    return this.orderRepository.save(order);
  }

  async updatePaymentStatus(id: string, paymentStatus: PaymentStatus, paymentTransactionId?: string): Promise<Order> {
    const order = await this.findOne(id);
    order.paymentStatus = paymentStatus;
    if (paymentTransactionId) {
      order.paymentTransactionId = paymentTransactionId;
    }
    return this.orderRepository.save(order);
  }

  async refundOrder(id: string, amount?: number): Promise<Order> {
    const order = await this.findOne(id);
    if (!order.paymentTransactionId) {
      throw new BadRequestException('Order has no payment transaction to refund');
    }

    await this.paymentsService.createRefund(order.paymentTransactionId, amount);
    order.paymentStatus = amount && amount > 0 && amount < order.total ? PaymentStatus.PARTIALLY_REFUNDED : PaymentStatus.REFUNDED;
    return this.orderRepository.save(order);
  }

  async updateTracking(id: string, trackingNumber: string): Promise<Order> {
    const order = await this.findOne(id);
    order.trackingNumber = trackingNumber;
    return this.orderRepository.save(order);
  }

  async getStats(): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    totalRevenue: number;
  }> {
    const [total, pending, confirmed, shipped, delivered, cancelled] = await Promise.all([
      this.orderRepository.count(),
      this.orderRepository.count({ where: { status: OrderStatus.PENDING } }),
      this.orderRepository.count({ where: { status: OrderStatus.CONFIRMED } }),
      this.orderRepository.count({ where: { status: OrderStatus.SHIPPED } }),
      this.orderRepository.count({ where: { status: OrderStatus.DELIVERED } }),
      this.orderRepository.count({ where: { status: OrderStatus.CANCELLED } }),
    ]);

    const revenueResult = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.total)', 'sum')
      .where('order.status != :status', { status: OrderStatus.CANCELLED })
      .getRawOne();

    const totalRevenue = parseFloat(revenueResult.sum) || 0;

    return {
      total,
      pending,
      confirmed,
      shipped,
      delivered,
      cancelled,
      totalRevenue,
    };
  }

  async createFromCart(userId: string, dto: CreateOrderFromCartDto): Promise<Order> {
    const cart = await this.cartRepository.findOne({
      where: { userId, isActive: true },
      relations: ['items', 'items.product', 'items.product.images'],
    });

    if (!cart || !cart.items || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const subtotal = cart.items.reduce((sum, item) => sum + item.total, 0);
    const shippingCost = dto.shippingCost ?? 0;
    const taxAmount = dto.taxAmount ?? 0;
    const discountAmount = dto.discountAmount ?? 0;
    const total = subtotal + shippingCost + taxAmount - discountAmount;

    const order = this.orderRepository.create({
      orderNumber: `ORD-${Date.now()}-${uuidv4().slice(0, 8)}`,
      status: OrderStatus.PENDING,
      paymentStatus: dto.paymentMethod === PaymentMethod.STRIPE ? PaymentStatus.PAID : PaymentStatus.PENDING,
      paymentMethod: dto.paymentMethod,
      subtotal,
      shippingCost,
      taxAmount,
      discountAmount,
      total,
      customerEmail: dto.customerEmail,
      customerPhone: dto.customerPhone,
      customerFirstName: dto.customerFirstName,
      customerLastName: dto.customerLastName,
      shippingAddress: dto.shippingAddress,
      shippingCity: dto.shippingCity,
      shippingCountry: dto.shippingCountry,
      billingAddress: dto.billingAddress,
      billingCity: dto.billingCity,
      billingCountry: dto.billingCountry,
      notes: dto.notes,
      paymentTransactionId: dto.paymentIntentId,
      userId,
    });

    order.items = cart.items.map((ci) => this.orderItemRepository.create({
      quantity: ci.quantity,
      price: ci.product.finalPrice,
      total: ci.product.finalPrice * ci.quantity,
      productName: ci.product.name,
      productSku: ci.product.sku,
      productImage: ci.product.images?.find((img) => img.isPrimary)?.url || ci.product.images?.[0]?.url,
      productId: ci.productId,
    }));

    const saved = await this.orderRepository.save(order);

    // clear cart
    await this.cartItemRepository.delete({ cartId: cart.id });

    // send email (best effort)
    try {
      await this.emailsService.sendOrderConfirmationEmail({
        id: userId,
        email: dto.customerEmail,
        firstName: dto.customerFirstName,
        lastName: dto.customerLastName,
      } as any, saved);
    } catch (e) {}

    return saved;
  }

  async createFromCartItems(dto: CreateOrderFromCartDto): Promise<Order> {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Calculate totals
    let subtotal = 0;
    for (const item of dto.items) {
      subtotal += item.price * item.quantity;
    }

    const total = subtotal + (dto.shippingCost || 0) + (dto.taxAmount || 0) - (dto.discountAmount || 0);

    // Create order
    const order = this.orderRepository.create({
      orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
      paymentMethod: dto.paymentMethod,
      paymentTransactionId: dto.paymentIntentId,
      subtotal,
      total,
      shippingCost: dto.shippingCost || 0,
      taxAmount: dto.taxAmount || 0,
      discountAmount: dto.discountAmount || 0,
      customerEmail: dto.customerEmail,
      customerFirstName: dto.customerFirstName,
      customerLastName: dto.customerLastName,
      customerPhone: dto.customerPhone,
      shippingAddress: dto.shippingAddress,
      shippingCity: dto.shippingCity,
      shippingCountry: dto.shippingCountry,
      billingAddress: dto.billingAddress || dto.shippingAddress,
      billingCity: dto.billingCity || dto.shippingCity,
      billingCountry: dto.billingCountry || dto.shippingCountry,
      notes: dto.notes,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Create order items
    for (const itemDto of dto.items) {
      const orderItem = this.orderItemRepository.create({
        orderId: savedOrder.id,
        productId: itemDto.productId,
        productName: itemDto.productName,
        productSku: itemDto.productSku,
        quantity: itemDto.quantity,
        price: itemDto.price,
        total: itemDto.price * itemDto.quantity,
      });

      await this.orderItemRepository.save(orderItem);

      // Update product stock if exists
      try {
        const product = await this.productRepository.findOne({ where: { id: itemDto.productId } });
        if (product) {
          product.stockQuantity = Math.max(0, product.stockQuantity - itemDto.quantity);
          product.salesCount = (product.salesCount || 0) + itemDto.quantity;
          await this.productRepository.save(product);
        }
      } catch (e) {
        // Continue even if product update fails
      }
    }

    // Send confirmation email
    try {
      await this.emailsService.sendOrderConfirmationEmail({
        email: dto.customerEmail,
        firstName: dto.customerFirstName,
        lastName: dto.customerLastName,
      } as any, savedOrder);
    } catch (e) {
      // Continue even if email fails
    }

    return this.findOne(savedOrder.id);
  }
}

 