import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ChevronDown, Filter, RefreshCw, Info, X, Search } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Add the missing data
const datesData = [
  { date: "2024-10-19", clicks: 87, impressions: 10894, ctr: 0.8, position: 29.12 },
  { date: "2024-10-18", clicks: 67, impressions: 9523, ctr: 0.7, position: 28.31 },
  { date: "2024-10-17", clicks: 77, impressions: 10396, ctr: 0.74, position: 30.77 },
  { date: "2024-10-16", clicks: 91, impressions: 10514, ctr: 0.87, position: 29.26 },
  { date: "2024-10-15", clicks: 101, impressions: 11178, ctr: 0.9, position: 29.96 },
  { date: "2024-10-14", clicks: 94, impressions: 11814, ctr: 0.8, position: 28.87 },
  { date: "2024-10-13", clicks: 110, impressions: 12314, ctr: 0.89, position: 28.34 },
  { date: "2024-10-12", clicks: 105, impressions: 11537, ctr: 0.91, position: 27.85 },
  { date: "2024-10-11", clicks: 138, impressions: 13182, ctr: 1.05, position: 27.77 },
  { date: "2024-10-10", clicks: 146, impressions: 19417, ctr: 0.75, position: 29.8 },
  { date: "2024-10-09", clicks: 155, impressions: 19239, ctr: 0.81, position: 29.6 },
  { date: "2024-10-08", clicks: 157, impressions: 15174, ctr: 1.03, position: 25.79 },
  { date: "2024-10-07", clicks: 150, impressions: 16735, ctr: 0.9, position: 26.37 },
  { date: "2024-10-06", clicks: 112, impressions: 13838, ctr: 0.81, position: 28.73 },
];

const queriesData = [
  { query: "vloer egaliseren", clicks: 170, impressions: 11863, ctr: 1.43, position: 8.42 },
  { query: "egaline droogtijd", clicks: 161, impressions: 2392, ctr: 6.73, position: 2.94 },
  { query: "droogtijd egaline", clicks: 127, impressions: 1991, ctr: 6.38, position: 2.84 },
  { query: "egaline", clicks: 115, impressions: 23186, ctr: 0.5, position: 7.8 },
  { query: "pvc vloer leggen", clicks: 80, impressions: 10899, ctr: 0.73, position: 6.86 },
];

const pagesData = [
  { page: "https://example.com/page1", clicks: 1639, impressions: 51548, ctr: 3.18, position: 11.11 },
  { page: "https://example.com/page2", clicks: 1219, impressions: 77792, ctr: 1.57, position: 19.51 },
  { page: "https://example.com/page3", clicks: 845, impressions: 64570, ctr: 1.31, position: 19.28 },
  { page: "https://example.com/page4", clicks: 622, impressions: 38447, ctr: 1.62, position: 18.23 },
  { page: "https://example.com/page5", clicks: 310, impressions: 24606, ctr: 1.26, position: 16.17 },
];

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('Last 28 days');
  const [searchType, setSearchType] = useState('Web');
  const [activeTab, setActiveTab] = useState('QUERIES');
  const [filters, setFilters] = useState([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const totalClicks = datesData.reduce((sum, day) => sum + day.clicks, 0);
  const totalImpressions = datesData.reduce((sum, day) => sum + day.impressions, 0);
  const averageCTR = (totalClicks / totalImpressions * 100).toFixed(1);
  const averagePosition = (datesData.reduce((sum, day) => sum + day.position, 0) / datesData.length).toFixed(1);

  const filterOptions = [
    { id: 'LaJeF', label: 'Query' },
    { id: 'DARUcf', label: 'Page' },
    { id: 'tOEJec', label: 'Country' },
    { id: 'FuIHKe', label: 'Device' },
    { id: 'wDc8pb', label: 'Search appearance' }
  ];

  const addFilter = (filterId) => {
    const newFilter = filterOptions.find(option => option.id === filterId);
    if (newFilter && !filters.some(f => f.id === filterId)) {
      setFilters([...filters, { ...newFilter, value: '' }]);
    }
    setIsFilterMenuOpen(false);
  };

  const removeFilter = (filterId) => {
    setFilters(filters.filter(f => f.id !== filterId));
  };

  const updateFilterValue = (filterId, value) => {
    setFilters(filters.map(f => f.id === filterId ? { ...f, value } : f));
  };

  const chartData = {
    labels: datesData.map(item => item.date),
    datasets: [
      {
        label: 'Clicks',
        data: datesData.map(item => item.clicks),
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        yAxisID: 'y',
      },
      {
        label: 'Impressions',
        data: datesData.map(item => item.impressions),
        borderColor: '#9333EA',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Clicks',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Impressions',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 font-sans rounded-lg shadow-md">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <div className="relative">
              <select 
                className="appearance-none bg-blue-50 border border-blue-200 rounded px-3 py-2 pr-8 text-sm text-blue-800 font-medium cursor-pointer"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option>Last 28 days</option>
                <option>Last 7 days</option>
                <option>Last 3 months</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-800 w-4 h-4" />
            </div>
            <div className="relative">
              <select 
                className="appearance-none bg-blue-50 border border-blue-200 rounded px-3 py-2 pr-8 text-sm text-blue-800 font-medium cursor-pointer"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option>Web</option>
                <option>Image</option>
                <option>Video</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-800 w-4 h-4" />
            </div>
            <div className="relative">
              <button
                className="bg-white border rounded px-3 py-2 text-sm font-medium flex items-center space-x-1 hover:bg-gray-50"
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              >
                <Filter className="w-4 h-4" />
                <span>Add filter</span>
              </button>
              {isFilterMenuOpen && (
                <div className="absolute z-10 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {filterOptions.map((option) => (
                      <button
                        key={option.id}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                        role="menuitem"
                        onClick={() => addFilter(option.id)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="text-blue-600 text-sm font-medium hover:underline flex items-center space-x-1">
              <RefreshCw className="w-4 h-4" />
              <span>Reset filters</span>
            </button>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <RefreshCw className="w-4 h-4 mr-1" />
            Last updated: 10 hours ago
          </div>
        </div>

        {filters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.map((filter) => (
              <div key={filter.id} className="flex items-center bg-blue-50 border border-blue-200 rounded px-2 py-1">
                <span className="text-sm font-medium text-blue-800 mr-2">{filter.label}:</span>
                <input
                  type="text"
                  className="bg-transparent border-none text-sm text-blue-800 focus:outline-none"
                  value={filter.value}
                  onChange={(e) => updateFilterValue(filter.id, e.target.value)}
                  placeholder="Enter value..."
                />
                <button onClick={() => removeFilter(filter.id)} className="ml-2 text-blue-600 hover:text-blue-800">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-600 text-white p-4 rounded-lg flex items-center justify-between">
            <div>
              <div className="text-sm font-medium mb-1">Total clicks</div>
              <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            </div>
            <Info className="w-5 h-5 text-blue-200" />
          </div>
          <div className="bg-purple-600 text-white p-4 rounded-lg flex items-center justify-between">
            <div>
              <div className="text-sm font-medium mb-1">Total impressions</div>
              <div className="text-2xl font-bold">{totalImpressions.toLocaleString()}</div>
            </div>
            <Info className="w-5 h-5 text-purple-200" />
          </div>
          <div className="bg-white border p-4 rounded-lg flex items-center justify-between">
            <div>
              <div className="text-sm font-medium mb-1">Average CTR</div>
              <div className="text-2xl font-bold">{averageCTR}%</div>
            </div>
            <Info className="w-5 h-5 text-gray-400" />
          </div>
          <div className="bg-white border p-4 rounded-lg flex items-center justify-between">
            <div>
              <div className="text-sm font-medium mb-1">Average position</div>
              <div className="text-2xl font-bold">{averagePosition}</div>
            </div>
            <Info className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h3>
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>

      <div>
        <div className="flex border-b">
          {['QUERIES', 'PAGES', 'COUNTRIES', 'DEVICES', 'SEARCH APPEARANCE', 'DATES'].map((tab) => (
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
          {activeTab === 'QUERIES' && (
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="py-3 px-4 font-medium">Query</th>
                  <th className="py-3 px-4 font-medium">Clicks</th>
                  <th className="py-3 px-4 font-medium">Impressions</th>
                  <th className="py-3 px-4 font-medium">CTR</th>
                  <th className="py-3 px-4 font-medium">Position</th>
                </tr>
              </thead>
              <tbody>
                {queriesData.map((row, index) => (
                  <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer">
                    <td className="py-3 px-4">{row.query}</td>
                    <td className="py-3 px-4 text-blue-600 font-medium">{row.clicks}</td>
                    <td className="py-3 px-4">{row.impressions}</td>
                    <td className="py-3 px-4">{row.ctr.toFixed(1)}%</td>
                    <td className="py-3 px-4">{row.position.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === 'PAGES' && (
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="py-3 px-4 font-medium">Page</th>
                  <th className="py-3 px-4 font-medium">Clicks</th>
                  <th className="py-3 px-4 font-medium">Impressions</th>
                  <th className="py-3 px-4 font-medium">CTR</th>
                  <th className="py-3 px-4 font-medium">Position</th>
                </tr>
              </thead>
              <tbody>
                {pagesData.map((row, index) => (
                  <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer">
                    <td className="py-3 px-4">{row.page}</td>
                    <td className="py-3 px-4 text-blue-600 font-medium">{row.clicks}</td>
                    <td className="py-3 px-4">{row.impressions}</td>
                    <td className="py-3 px-4">{row.ctr.toFixed(1)}%</td>
                    <td className="py-3 px-4">{row.position.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* Add similar table structures for COUNTRIES, DEVICES, SEARCH APPEARANCE, and DATES tabs */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
