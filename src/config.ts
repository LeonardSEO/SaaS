import { createClient } from '@supabase/supabase-js';
import { google } from 'googleapis';
import OpenAI from 'openai';
import Stripe from 'stripe';

export const config = {
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    successUrl: process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/success',
    cancelUrl: process.env.STRIPE_CANCEL_URL || 'http://localhost:3000/cancel',
  },
};

// Initialize Supabase client
export const supabase = createClient(config.supabase.url, config.supabase.anonKey);

// Initialize OpenAI client
export const openai = new OpenAI({ apiKey: config.openai.apiKey });

// Initialize Stripe client
export const stripe = new Stripe(config.stripe.secretKey, { apiVersion: '2023-10-16' });

// Google APIs setup (not initialized here to avoid unnecessary API calls)
export const googleApis = {
  oauth2: google.oauth2('v2'),
  searchconsole: google.webmasters('v3'),
  ads: google.ads('v14'),
};