import React from 'react';
import { Info } from 'lucide-react';

const PerformanceMetrics: React.FC = () => {
  // These values should be fetched from your data source
  const totalClicks = 3480;
  const totalImpressions = 384000;
  const averageCTR = 0.9;
  const averagePosition = 28.2;

  return (
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
  );
};

export default PerformanceMetrics;