export const STRIPE_PRODUCTS = {
  BASIC: {
    id: 'prod_R5YZDJsCdnoPgg',
    name: 'Basic',
    price: 29,
    priceId: 'price_basic', // Replace with your actual Stripe price ID
    features: [
      'Essential SEO tools',
      'Enhanced Google Search Console insights',
      'Keyword analysis tools',
      'Basic Goldmine campaign functionality',
      'Perfect for small businesses'
    ]
  },
  PRO: {
    id: 'prod_R5Yb2bM4PJAK0t',
    name: 'Pro',
    price: 99,
    priceId: 'price_pro', // Replace with your actual Stripe price ID
    features: [
      'Full AI-powered SEO suite',
      'Content generation',
      'Keyword intent analysis',
      'Advanced Goldmine campaigns',
      'AI optimization',
      '50 AI generations per month',
      '100,000 keywords storage'
    ]
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: null,
    features: [
      'Custom AI generation limits',
      'Unlimited keywords storage',
      'Priority support',
      'Custom integrations',
      'Dedicated account manager',
      'Custom pricing',
      'API access'
    ]
  }
};

export const STRIPE_PRICES = {
  BASIC: STRIPE_PRODUCTS.BASIC.priceId,
  PRO: STRIPE_PRODUCTS.PRO.priceId
};
