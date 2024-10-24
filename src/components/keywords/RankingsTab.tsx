import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ArrowUp, ArrowDown, Minus, Smartphone, Monitor, Filter, Download } from 'lucide-react';

interface RankingData {
  keyword: string;
  currentPosition: number;
  previousPosition: number;
  bestPosition: number;
  device: 'mobile' | 'desktop';
  serpFeatures: string[];
  history: number[];
}

const RankingsTab: React.FC = () => {
  const [activeView, setActiveView] = useState('all');
  const [deviceFilter, setDeviceFilter] = useState<'all' | 'mobile' | 'desktop'>('all');

  const rankingData: RankingData[] = [
    {
      keyword: "vloer egaliseren",
      currentPosition: 8.42,
      previousPosition: 9.1,
      bestPosition: 7.8,
      device: 'mobile',
      serpFeatures: ['featured_snippet', 'images'],
      history: [9.1, 8.9, 8.7, 8.5, 8.42]
    },
    // Add more ranking data here
  ];

  const distributionData = {
    labels: ['1-3', '4-10', '11-20', '21-50', '51-100'],
    datasets: [{
      label: 'Keywords',
      data: [5, 12, 18, 25, 15],
      backgroundColor: ['#22C55E', '#3B82F6', '#6366F1', '#A855F7', '#EC4899'],
    }]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <select 
            className="bg-white border rounded-lg px-3 py-2 text-sm"
            value={activeView}
            onChange={(e) => setActiveView(e.target.value)}
          >
            <option value="all">All Keywords</option>
            <option value="winners">Winners</option>
            <option value="losers">Losers</option>
            <option value="stable">Stable</option>
          </select>
          
          <div className="flex items-center space-x-2 border rounded-lg px-3 py-2">
            <button
              className={`p-1 rounded ${deviceFilter === 'all' ? 'bg-blue-100 text-blue-600' : ''}`}
              onClick={() => setDeviceFilter('all')}
            >
              All
            </button>
            <button
              className={`p-1 rounded ${deviceFilter === 'mobile' ? 'bg-blue-100 text-blue-600' : ''}`}
              onClick={() => setDeviceFilter('mobile')}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              className={`p-1 rounded ${deviceFilter === 'desktop' ? 'bg-blue-100 text-blue-600' : ''}`}
              onClick={() => setDeviceFilter('desktop')}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 px-3 py-2 border rounded-lg">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-2 border rounded-lg">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Position Distribution</h3>
          <div className="h-64">
            <Line data={distributionData} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          {/* Add content for second grid item */}
        </div>
      </div>
    </div>
  );
};

export default RankingsTab;
