import React, { useState } from 'react';
import AccountManagement from '../components/settings/AccountManagement';
import IntegrationSettings from '../components/settings/IntegrationSettings';
import SubscriptionManagement from '../components/settings/SubscriptionManagement';
import NotificationSettings from '../components/settings/NotificationSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import CustomizationOptions from '../components/settings/CustomizationOptions';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'subscription', label: 'Subscription' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
    { id: 'customization', label: 'Customization' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="flex border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {activeTab === 'account' && <AccountManagement />}
        {activeTab === 'integrations' && <IntegrationSettings />}
        {activeTab === 'subscription' && <SubscriptionManagement />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'customization' && <CustomizationOptions />}
      </div>
    </div>
  );
};

export default SettingsPage;
