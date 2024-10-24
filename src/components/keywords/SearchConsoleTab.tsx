import React, { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { ChevronDown, Filter, RefreshCw, Info, X, Search, Calendar, Download, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
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

// Add these interfaces at the top of the file, after the imports
interface Filter {
  id: string;
  label: string;
  value: string;
}

interface FilterOption {
  id: string;
  label: string;
}

interface ChartTooltipContext {
  dataset: {
    label?: string;
  };
  parsed: {
    y: number;
  };
}

interface QueryData {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  intent?: 'informational' | 'transactional' | 'navigational';
  isNew?: boolean;
  trend?: 'up' | 'down' | 'stable';
  serpFeatures?: string[];
}

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

const queriesData: QueryData[] = [
  { 
    query: "vloer egaliseren",
    clicks: 170,
    impressions: 11863,
    ctr: 1.43,
    position: 8.42,
    intent: 'informational',
    isNew: false,
    trend: 'up',
    serpFeatures: ['featured_snippet', 'images']
  },
  { 
    query: "egaline droogtijd",
    clicks: 161,
    impressions: 2392,
    ctr: 6.73,
    position: 2.94,
    intent: 'informational',
    isNew: true,
    trend: 'stable',
    serpFeatures: ['featured_snippet']
  },
  { query: "droogtijd egaline", clicks: 127, impressions: 1991, ctr: 6.38, position: 2.84, intent: 'informational', isNew: false, trend: 'stable', serpFeatures: [] },
  { query: "egaline", clicks: 115, impressions: 23186, ctr: 0.5, position: 7.8, intent: 'informational', isNew: false, trend: 'stable', serpFeatures: [] },
  { query: "pvc vloer leggen", clicks: 80, impressions: 10899, ctr: 0.73, position: 6.86, intent: 'informational', isNew: false, trend: 'stable', serpFeatures: [] },
];

const pagesData = [
  { page: "https://example.com/page1", clicks: 1639, impressions: 51548, ctr: 3.18, position: 11.11 },
  { page: "https://example.com/page2", clicks: 1219, impressions: 77792, ctr: 1.57, position: 19.51 },
  { page: "https://example.com/page3", clicks: 845, impressions: 64570, ctr: 1.31, position: 19.28 },
  { page: "https://example.com/page4", clicks: 622, impressions: 38447, ctr: 1.62, position: 18.23 },
  { page: "https://example.com/page5", clicks: 310, impressions: 24606, ctr: 1.26, position: 16.17 },
];

// Add this before the SearchConsoleTab component
const previousPeriod = {
  totalClicks: 1200,
  totalImpressions: 95000,
  averageCTR: 1.2,
  averagePosition: 28.5
};

// Add this before the SearchConsoleTab component
const QueriesTable: React.FC<{ data: QueryData[]; showTrends?: boolean }> = ({ data, showTrends }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left p-4 font-medium text-gray-900">Query</th>
          <th className="text-right p-4 font-medium text-gray-900">Clicks</th>
          <th className="text-right p-4 font-medium text-gray-900">Impressions</th>
          <th className="text-right p-4 font-medium text-gray-900">CTR</th>
          <th className="text-right p-4 font-medium text-gray-900">Position</th>
          {/* Add new column */}
          <th className="text-left p-4 font-medium text-gray-900">SERP Features</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.query} className="border-b hover:bg-gray-50">
            {/* Existing columns */}
            <td className="p-4 text-gray-900">{row.query}</td>
            <td className="p-4 text-right text-gray-900">{row.clicks.toLocaleString()}</td>
            <td className="p-4 text-right text-gray-900">{row.impressions.toLocaleString()}</td>
            <td className="p-4 text-right text-gray-900">{row.ctr.toFixed(2)}%</td>
            <td className="p-4 text-right text-gray-900">{row.position.toFixed(1)}</td>
            {/* New SERP Features column */}
            <td className="p-4 text-gray-900">
              <div className="flex gap-1">
                {row.serpFeatures?.map((feature) => (
                  <span key={feature} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {feature}
                  </span>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Add this helper component
const TrendIndicator: React.FC<{ value: number; previousValue: number }> = ({ value, previousValue }) => {
  const percentChange = ((value - previousValue) / previousValue) * 100;
  
  return (
    <div className="flex items-center gap-1">
      {percentChange > 0 ? (
        <div className="flex items-center text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">+{percentChange.toFixed(1)}%</span>
        </div>
      ) : percentChange < 0 ? (
        <div className="flex items-center text-red-600">
          <TrendingDown className="w-4 h-4" />
          <span className="text-sm">{percentChange.toFixed(1)}%</span>
        </div>
      ) : (
        <div className="flex items-center text-gray-600">
          <Minus className="w-4 h-4" />
          <span className="text-sm">0%</span>
        </div>
      )}
    </div>
  );
};

// Update the metrics cards to include trends
const MetricsCard: React.FC<{
  label: string;
  value: number;
  previousValue: number;
  formatter?: (value: number) => string;
}> = ({ label, value, previousValue, formatter = (v) => v.toLocaleString() }) => {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-sm text-gray-500">{label}</div>
          <div className="text-2xl font-bold">{formatter(value)}</div>
        </div>
        <TrendIndicator value={value} previousValue={previousValue} />
      </div>
      <div className="text-xs text-gray-500">vs. previous period</div>
    </div>
  );
};

// Add this interface for the date range
interface DateRange {
  start: string;
  end: string;
}

// Update the chart data structure
const getChartData = (currentData: typeof datesData, comparisonData?: typeof datesData) => ({
  labels: currentData.map(item => item.date),
  datasets: [
    {
      label: 'Clicks',
      data: currentData.map(item => item.clicks),
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      yAxisID: 'y',
    },
    ...(comparisonData ? [{
      label: 'Previous Clicks',
      data: comparisonData.map(item => item.clicks),
      borderColor: '#4F46E5',
      backgroundColor: 'transparent',
      borderDash: [5, 5],
      yAxisID: 'y',
    }] : []),
    // ... similar for impressions
  ],
});

// Update the date range selector
const DateRangeSelector: React.FC<{
  currentRange: DateRange;
  comparisonEnabled: boolean;
  onRangeChange: (range: DateRange) => void;
  onComparisonToggle: (enabled: boolean) => void;
}> = ({ currentRange, comparisonEnabled, onRangeChange, onComparisonToggle }) => {
  return (
    <div className="flex items-center space-x-2">
      <button className="flex items-center space-x-2 bg-white border rounded-lg px-3 py-2">
        <Calendar className="w-4 h-4" />
        <span>{currentRange.start} - {currentRange.end}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      <button 
        className={`px-3 py-2 rounded-lg text-sm ${
          comparisonEnabled ? 'bg-blue-50 text-blue-600' : 'bg-white border'
        }`}
        onClick={() => onComparisonToggle(!comparisonEnabled)}
      >
        Compare
      </button>
    </div>
  );
};

const SearchConsoleTab: React.FC = () => {
  const [dateRange, setDateRange] = useState({ start: '2024-09-19', end: '2024-10-19' });
  const [comparisonRange, setComparisonRange] = useState(false);
  const [searchType, setSearchType] = useState('Web');
  const [activeMetricsTab, setActiveMetricsTab] = useState('QUERIES');
  const [filters, setFilters] = useState<Filter[]>([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<{
    intent?: string;
    position?: string;
    trend?: string;
    serpFeatures?: string[];
  }>({});

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

  const addFilter = (filterId: string) => {
    const newFilter = filterOptions.find(option => option.id === filterId);
    if (newFilter && !filters.some(f => f.id === filterId)) {
      setFilters([...filters, { ...newFilter, value: '' }]);
    }
    setIsFilterMenuOpen(false);
  };

  const removeFilter = (filterId: string) => {
    setFilters(filters.filter(f => f.id !== filterId));
  };

  const updateFilterValue = (filterId: string, value: string) => {
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          padding: 8,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: ChartTooltipContext) {
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
          display: false
        },
        ticks: {
          font: {
            size: 10
          }
        }
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
        ticks: {
          font: {
            size: 10
          }
        }
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
        ticks: {
          font: {
            size: 10
          }
        }
      },
    },
  };

  const filteredData = useMemo(() => {
    return queriesData.filter(row => {
      if (activeFilters.intent && row.intent !== activeFilters.intent) return false;
      if (activeFilters.trend && row.trend !== activeFilters.trend) return false;
      // Add more filter conditions
      return true;
    });
  }, [queriesData, activeFilters]);

  return (
    <div className="space-y-6">
      {/* Enhanced Date and Comparison Controls */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-white border rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4" />
              <span>Custom Range</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button 
              className={`px-3 py-2 rounded-lg text-sm ${
                comparisonRange ? 'bg-blue-50 text-blue-600' : 'bg-white border'
              }`}
              onClick={() => setComparisonRange(!comparisonRange)}
            >
              Compare
            </button>
          </div>
          
          {/* Advanced Filters Section */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search queries..."
                className="pl-8 pr-3 py-2 border rounded-lg"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button className="flex items-center space-x-1 px-3 py-2 border rounded-lg">
              <Filter className="w-4 h-4" />
              <span>Advanced Filter</span>
            </button>
          </div>
        </div>

        {/* Export Options */}
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 px-3 py-2 border rounded-lg">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Updated Performance Metrics Grid */}
      <div className="grid grid-cols-4 gap-4">
        <MetricsCard
          label="Clicks"
          value={totalClicks}
          previousValue={previousPeriod.totalClicks}
        />
        <MetricsCard
          label="Impressions"
          value={totalImpressions}
          previousValue={previousPeriod.totalImpressions}
        />
        <MetricsCard
          label="CTR"
          value={parseFloat(averageCTR)}
          previousValue={previousPeriod.averageCTR}
          formatter={(v) => `${v.toFixed(1)}%`}
        />
        <MetricsCard
          label="Average Position"
          value={parseFloat(averagePosition)}
          previousValue={previousPeriod.averagePosition}
          formatter={(v) => v.toFixed(1)}
        />
      </div>

      {/* Enhanced Performance Graph */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Performance Over Time</h3>
          <div className="flex space-x-2">
            {['Clicks', 'Impressions', 'CTR', 'Position'].map(metric => (
              <button
                key={metric}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200"
              >
                {metric}
              </button>
            ))}
          </div>
        </div>
        <div className="h-80">
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>

      {/* Enhanced Data Tables */}
      <div className="bg-white rounded-lg border">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex space-x-4">
            {['QUERIES', 'PAGES', 'COUNTRIES', 'DEVICES', 'SEARCH APPEARANCE'].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1.5 text-sm font-medium ${
                  activeMetricsTab === tab 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveMetricsTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {selectedRows.length} selected
            </span>
            {selectedRows.length > 0 && (
              <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded">
                Add to Campaign
              </button>
            )}
          </div>
        </div>
        
        {/* Enhanced Table Content */}
        {/* ... (keep existing table structure but add checkboxes and more columns) */}
        <div className="p-4 border-b">
          <div className="flex space-x-4 mb-4">
            <select 
              className="border rounded-lg px-3 py-2 text-sm"
              onChange={(e) => setActiveFilters(prev => ({ ...prev, intent: e.target.value }))}
            >
              <option value="">All Intents</option>
              <option value="informational">Informational</option>
              <option value="transactional">Transactional</option>
              <option value="navigational">Navigational</option>
            </select>
            
            <select 
              className="border rounded-lg px-3 py-2 text-sm"
              onChange={(e) => setActiveFilters(prev => ({ ...prev, trend: e.target.value }))}
            >
              <option value="">All Trends</option>
              <option value="up">Increasing</option>
              <option value="down">Decreasing</option>
              <option value="stable">Stable</option>
            </select>
          </div>
        </div>
        
        <QueriesTable data={filteredData} showTrends={true} />
      </div>
    </div>
  );
};

export default SearchConsoleTab;
