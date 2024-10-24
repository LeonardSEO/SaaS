import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { config as appConfig } from '../../config';

const stripe = new Stripe(appConfig.stripe.secretKey, { apiVersion: '2023-10-16' });
const supabase = createClient(appConfig.supabase.url, appConfig.supabase.anonKey);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSuccess(paymentIntent);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailure(failedPayment);
        break;

      case 'payment_intent.processing':
        const processingPayment = event.data.object as Stripe.PaymentIntent;
        await handlePaymentProcessing(processingPayment);
        break;

      case 'payment_intent.requires_action':
        const actionRequired = event.data.object as Stripe.PaymentIntent;
        await handlePaymentActionRequired(actionRequired);
        break;
    }

    res.json({ received: true });
  } catch (err: any) {
    console.error('Webhook handler failed:', err);
    res.status(500).send(`Webhook Error: ${err.message}`);
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  // Update payment status in database
  await supabase
    .from('payments')
    .upsert({
      payment_intent_id: paymentIntent.id,
      status: 'succeeded',
      amount: paymentIntent.amount,
      customer_id: paymentIntent.customer as string,
      completed_at: new Date().toISOString()
    });

  // Additional success handling (e.g., sending confirmation emails, updating inventory)
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  const errorMessage = paymentIntent.last_payment_error?.message;
  
  await supabase
    .from('payments')
    .upsert({
      payment_intent_id: paymentIntent.id,
      status: 'failed',
      error_message: errorMessage,
      customer_id: paymentIntent.customer as string,
      failed_at: new Date().toISOString()
    });

  // Additional failure handling (e.g., sending failure notification emails)
}

async function handlePaymentProcessing(paymentIntent: Stripe.PaymentIntent) {
  await supabase
    .from('payments')
    .upsert({
      payment_intent_id: paymentIntent.id,
      status: 'processing',
      customer_id: paymentIntent.customer as string,
      updated_at: new Date().toISOString()
    });
}

async function handlePaymentActionRequired(paymentIntent: Stripe.PaymentIntent) {
  await supabase
    .from('payments')
    .upsert({
      payment_intent_id: paymentIntent.id,
      status: 'requires_action',
      customer_id: paymentIntent.customer as string,
      updated_at: new Date().toISOString()
    });
}
