import React from 'react';
import { TrendingUp, AlertTriangle, Target } from 'lucide-react';

const OpportunitiesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Untapped Keywords</h3>
            <TrendingUp className="text-green-500 w-5 h-5" />
          </div>
          <div className="space-y-3">
            {/* Add untapped keywords list */}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Content Gaps</h3>
            <AlertTriangle className="text-orange-500 w-5 h-5" />
          </div>
          <div className="space-y-3">
            {/* Add content gaps list */}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Quick Wins</h3>
            <Target className="text-blue-500 w-5 h-5" />
          </div>
          <div className="space-y-3">
            {/* Add quick wins list */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesTab;
