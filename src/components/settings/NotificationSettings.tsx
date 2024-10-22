import React, { useState } from 'react';

const NotificationSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    weeklyReport: true,
    rankingChanges: true,
    newBacklinks: false,
  });

  const [customAlerts, setCustomAlerts] = useState([
    { id: 1, name: 'Traffic Drop Alert', threshold: '20%', enabled: true },
    { id: 2, name: 'Keyword Position Alert', threshold: 'Top 10', enabled: false },
  ]);

  const handleEmailNotificationChange = (setting: keyof typeof emailNotifications) => {
    setEmailNotifications(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleCustomAlertToggle = (id: number) => {
    setCustomAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
    ));
  };

  const handleAddCustomAlert = () => {
    // Implement add custom alert logic here
    console.log('Add custom alert');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Email Notifications</h3>
        <div className="space-y-2">
          {Object.entries(emailNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                id={key}
                checked={value}
                onChange={() => handleEmailNotificationChange(key as keyof typeof emailNotifications)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <label htmlFor={key} className="ml-2 block text-sm text-gray-900">
                {key.split(/(?=[A-Z])/).join(' ')}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Custom Alerts</h3>
        <ul className="space-y-2">
          {customAlerts.map((alert) => (
            <li key={alert.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{alert.name} (Threshold: {alert.threshold})</span>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={alert.enabled} onChange={() => handleCustomAlertToggle(alert.id)} />
                  <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                  <div className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${alert.enabled ? 'transform translate-x-full bg-blue-600' : ''}`}></div>
                </div>
              </label>
            </li>
          ))}
        </ul>
        <button onClick={handleAddCustomAlert} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Add Custom Alert
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
