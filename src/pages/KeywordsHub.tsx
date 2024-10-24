import React, { useState } from 'react';
import SearchConsoleTab from '../components/keywords/SearchConsoleTab';
import KeywordAnalysisTab from '../components/keywords/KeywordAnalysisTab';
import OpportunitiesTab from '../components/keywords/OpportunitiesTab';
import RankingsTab from '../components/keywords/RankingsTab';

const KeywordsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('search-console');

  const tabs = [
    { id: 'search-console', label: 'Search Console' },
    { id: 'keyword-analysis', label: 'Keyword Analysis' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'rankings', label: 'Rankings' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Keywords Hub</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Export Data
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Add Keywords
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === 'search-console' && <SearchConsoleTab />}
        {activeTab === 'keyword-analysis' && <KeywordAnalysisTab />}
        {activeTab === 'opportunities' && <OpportunitiesTab />}
        {activeTab === 'rankings' && <RankingsTab />}
      </div>
    </div>
  );
};

export default KeywordsHub;
