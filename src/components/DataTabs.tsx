import React, { useState } from 'react';
import QueriesTable from './QueriesTable';
import PagesTable from './PagesTable';
import CountriesTable from './CountriesTable';
import DevicesTable from './DevicesTable';

const DataTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('QUERIES');

  const tabs = ['QUERIES', 'PAGES', 'COUNTRIES', 'DEVICES', 'SEARCH APPEARANCE', 'DATES'];

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-sm ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4">
        {activeTab === 'QUERIES' && <QueriesTable />}
        {activeTab === 'PAGES' && <PagesTable />}
        {activeTab === 'COUNTRIES' && <CountriesTable />}
        {activeTab === 'DEVICES' && <DevicesTable />}
        {/* Add other tab content components as needed */}
      </div>
    </div>
  );
};

export default DataTabs;