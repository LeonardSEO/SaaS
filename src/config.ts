import { createClient } from '@supabase/supabase-js';
import { google } from 'googleapis';
import OpenAI from 'openai';
import Stripe from 'stripe';

export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
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

// Lazy initialization of Google APIs (temporarily disabled)
export const getGoogleApis = () => ({
  oauth2: null,
  searchconsole: null,
  ads: null,
});
