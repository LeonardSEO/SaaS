import React, { useState } from 'react';

const SubscriptionManagement: React.FC = () => {
  const [subscription, setSubscription] = useState({
    plan: 'Pro',
    billingCycle: 'Monthly',
    nextBillingDate: '2023-07-01',
  });

  const [usage, setUsage] = useState({
    apiCalls: 8500,
    storage: '2.3 GB',
    reports: 15,
  });

  const handleUpgrade = () => {
    // Implement upgrade logic here
    console.log('Upgrade subscription');
  };

  const handleCancelSubscription = () => {
    // Implement cancel subscription logic here
    console.log('Cancel subscription');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Subscription Management</h2>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Plan Details</h3>
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Current Plan:</strong> {subscription.plan}</p>
          <p><strong>Billing Cycle:</strong> {subscription.billingCycle}</p>
          <p><strong>Next Billing Date:</strong> {subscription.nextBillingDate}</p>
        </div>
        <div className="mt-4 space-x-4">
          <button onClick={handleUpgrade} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Upgrade Plan
          </button>
          <button onClick={handleCancelSubscription} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Cancel Subscription
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Usage Statistics</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>API Calls</span>
            <span>{usage.apiCalls} / 10,000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(usage.apiCalls / 10000) * 100}%` }}></div>
          </div>
          <div className="flex justify-between items-center">
            <span>Storage</span>
            <span>{usage.storage} / 5 GB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '46%' }}></div>
          </div>
          <div className="flex justify-between items-center">
            <span>Reports Generated</span>
            <span>{usage.reports} / 20</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
