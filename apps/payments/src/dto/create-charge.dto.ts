import Stripe from 'stripe';

export class CreateChargeDto {
  amount: number;
  card: Stripe.PaymentMethodCreateParams.Card1;
}
