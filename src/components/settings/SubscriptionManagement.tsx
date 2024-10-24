import React, { useState, useEffect } from 'react';
import { createCheckoutSession, cancelSubscription } from '../../services/stripeService';
import { createClient } from '@supabase/supabase-js';
import { config } from '../../config';
import { STRIPE_PRODUCTS, STRIPE_PRICES } from '../../config/stripe';
import { CheckIcon } from 'lucide-react';

const supabase = createClient(config.supabase.url, config.supabase.anonKey);

const SubscriptionManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: sub } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    setSubscription(sub);
  };

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const session = await createCheckoutSession(priceId, user.id);
      
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSales = () => {
    window.location.href = '/contact-sales';
  };

  const handleCancelSubscription = async () => {
    if (!subscription?.stripe_subscription_id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      await cancelSubscription(subscription.stripe_subscription_id);
      await fetchSubscription();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Subscription Plans</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(STRIPE_PRODUCTS).map(([key, product]) => (
          <div 
            key={key}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              key === 'PRO' ? 'border-2 border-blue-500' : ''
            }`}
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h3>
              <div className="mb-6">
                {product.price ? (
                  <p className="text-4xl font-bold text-gray-900">
                    ${product.price}
                    <span className="text-lg font-normal text-gray-500">/month</span>
                  </p>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">Custom Pricing</p>
                )}
              </div>
              
              <ul className="space-y-4 mb-8">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {key === 'ENTERPRISE' ? (
                <button
                  onClick={handleContactSales}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  Contact Sales
                </button>
              ) : (
                <button
                  onClick={() => handleSubscribe(STRIPE_PRICES[key as keyof typeof STRIPE_PRICES])}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Subscribe Now'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {subscription && (
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Current Subscription</h3>
          <p className="mb-4">Plan: {subscription.plan_name}</p>
          <p className="mb-4">Status: {subscription.status}</p>
          <p className="mb-6">
            Next billing date: {new Date(subscription.current_period_end).toLocaleDateString()}
          </p>
          
          <button
            onClick={handleCancelSubscription}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Cancel Subscription'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;
