import { createClient } from '@supabase/supabase-js';
import { google } from 'googleapis';
import OpenAI from 'openai';
import Stripe from 'stripe';
import { createObjectCsvWriter } from 'csv-writer';
import { config } from './config';

// Initialize clients
const supabase = createClient(config.supabase.url, config.supabase.anonKey);
const openai = new OpenAI({ apiKey: config.openai.apiKey });
const stripe = new Stripe(config.stripe.secretKey, { apiVersion: '2023-10-16' });

async function signInWithGoogle() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google',
  });
  if (error) throw error;
  return { user, session };
}

async function getSearchConsoleData(auth: any, siteUrl: string) {
  const searchConsole = google.webmasters('v3');
  const response = await searchConsole.searchanalytics.query({
    auth,
    siteUrl,
    requestBody: {
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      dimensions: ['query'],
      rowLimit: 10,
    },
  });
  return response.data.rows;
}

async function getGoogleAdsData(auth: any, customerId: string) {
  const adsClient = new google.ads.googleads.v7.services.GoogleAdsServiceClient({ auth });
  const query = `SELECT campaign.id, ad_group.id, ad_group_criterion.criterion_id FROM ad_group_criterion WHERE ad_group.status = 'ENABLED'`;
  
  const [response] = await adsClient.search({ customerId, query });
  return response.results;
}

async function analyzeKeywordIntents(keywords: string[]) {
  const responses = await Promise.all(keywords.map(async (keyword) => {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: `Classify this keyword intent: ${keyword}` }],
    });
    return response.choices[0].message.content;
  }));
  return responses;
}

async function createCheckoutSession(items: { name: string; price: number; quantity: number }[]) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: config.stripe.successUrl,
    cancel_url: config.stripe.cancelUrl,
  });
  return session.url;
}

async function saveDataToSupabase(data: any) {
  const { error } = await supabase.from('keyword_intents').insert(data);
  if (error) throw error;
}

async function exportToCSV(data: any[]) {
  const csvWriter = createObjectCsvWriter({
    path: 'output.csv',
    header: [
      { id: 'keyword', title: 'Keyword' },
      { id: 'intent', title: 'Intent' },
    ],
  });

  await csvWriter.writeRecords(data);
}

async function main() {
  try {
    // Step 1: Authenticate User
    const { user, session } = await signInWithGoogle();

    // Step 2: Get data from Google Search Console
    const siteUrl = 'https://example.com'; // This should be dynamically set based on the user's connected site
    const searchConsoleData = await getSearchConsoleData(session.provider_token, siteUrl);

    // Step 3: Get data from Google Ads
    const customerId = 'YOUR_CUSTOMER_ID'; // This should be dynamically set based on the user's Google Ads account
    const googleAdsData = await getGoogleAdsData(session.provider_token, customerId);

    // Step 4: Analyze keywords with OpenAI
    const keywordsToAnalyze = [...searchConsoleData, ...googleAdsData].map(item => item.query || item.criterion_id);
    const intents = await analyzeKeywordIntents(keywordsToAnalyze);

    // Step 5: Save analyzed data to Supabase
    const analyzedData = keywordsToAnalyze.map((keyword, index) => ({
      keyword,
      intent: intents[index],
    }));
    await saveDataToSupabase(analyzedData);

    // Step 6: Create Stripe checkout session
    const checkoutUrl = await createCheckoutSession([{ name: "Subscription", price: 20, quantity: 1 }]);

    // Step 7: Export data to CSV
    await exportToCSV(analyzedData);

    console.log(`Checkout URL: ${checkoutUrl}`);
    console.log('Data exported to output.csv');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export { main };