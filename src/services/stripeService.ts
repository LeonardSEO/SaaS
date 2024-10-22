import Stripe from 'stripe';
import { config } from '../config';

const stripe = new Stripe(config.stripe.secretKey, { apiVersion: '2023-10-16' });

export async function createCheckoutSession(priceId: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: config.stripe.successUrl,
    cancel_url: config.stripe.cancelUrl,
  });
  return session.url;
}
