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
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  },
  stripe: {
    secretKey: import.meta.env.VITE_STRIPE_SECRET_KEY || '',
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
    successUrl: `${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/success`,
    cancelUrl: `${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/cancel`,
    webhookSecret: import.meta.env.VITE_STRIPE_WEBHOOK_SECRET || '',
  },
};

// Initialize Supabase client
export const supabase = createClient(config.supabase.url, config.supabase.anonKey);

// Initialize OpenAI client with browser safety flag
export const openai = new OpenAI({ 
  apiKey: config.openai.apiKey,
  dangerouslyAllowBrowser: true  // Only use this for development/testing
});

// Initialize Stripe client
export const stripe = new Stripe(config.stripe.secretKey, { apiVersion: '2023-10-16' });

// Lazy initialization of Google APIs (temporarily disabled)
export const getGoogleApis = () => ({
  oauth2: null,
  searchconsole: null,
  ads: null,
});
