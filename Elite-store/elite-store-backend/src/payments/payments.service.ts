import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('stripe.secretKey') || 'your_stripe_secret_key', {
      apiVersion: '2025-07-30.basil',
    });
  }

  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<{ clientSecret: string }> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret || '',
    };
  }

  async confirmPayment(paymentIntentId: string): Promise<any> {
    return this.stripe.paymentIntents.retrieve(paymentIntentId);
  }

  async createRefund(paymentIntentId: string, amount?: number): Promise<any> {
    const refundData: any = { payment_intent: paymentIntentId };
    
    if (amount) {
      refundData.amount = Math.round(amount * 100);
    }

    return this.stripe.refunds.create(refundData);
  }
}

 