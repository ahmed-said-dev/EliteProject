import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  @ApiOperation({ summary: 'Create payment intent' })
  @ApiResponse({ status: 200, description: 'Payment intent created successfully' })
  async createPaymentIntent(
    @Body('amount') amount: number,
    @Body('currency') currency: string = 'usd',
  ) {
    return this.paymentsService.createPaymentIntent(amount, currency);
  }

  @Post('confirm')
  @ApiOperation({ summary: 'Confirm payment' })
  @ApiResponse({ status: 200, description: 'Payment confirmed successfully' })
  async confirmPayment(@Body('paymentIntentId') paymentIntentId: string) {
    return this.paymentsService.confirmPayment(paymentIntentId);
  }

  @Post('refund')
  @ApiOperation({ summary: 'Create refund' })
  @ApiResponse({ status: 200, description: 'Refund created successfully' })
  async createRefund(
    @Body('paymentIntentId') paymentIntentId: string,
    @Body('amount') amount?: number,
  ) {
    return this.paymentsService.createRefund(paymentIntentId, amount);
  }
}

 