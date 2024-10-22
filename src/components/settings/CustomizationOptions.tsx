import React, { useState } from 'react';

const CustomizationOptions: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const [dashboardLayout, setDashboardLayout] = useState('default');
  const [defaultView, setDefaultView] = useState('overview');

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleLayoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDashboardLayout(e.target.value);
  };

  const handleDefaultViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDefaultView(e.target.value);
  };

  const handleSaveChanges = () => {
    // Implement save changes logic here
    console.log('Save customization changes', { theme, dashboardLayout, defaultView });
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold mb-4">Customization Options</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Theme Settings</h3>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-700 text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Dashboard Layout</h3>
          <select
            value={dashboardLayout}
            onChange={handleLayoutChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-700 text-white"
          >
            <option value="default">Default</option>
            <option value="compact">Compact</option>
            <option value="expanded">Expanded</option>
          </select>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Default View</h3>
          <select
            value={defaultView}
            onChange={handleDefaultViewChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-700 text-white"
          >
            <option value="overview">Overview</option>
            <option value="analytics">Analytics</option>
            <option value="reports">Reports</option>
          </select>
        </div>
        <button
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CustomizationOptions;
