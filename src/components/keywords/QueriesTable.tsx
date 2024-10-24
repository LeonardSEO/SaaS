import React from 'react';
import { QueryData } from '../../types/searchConsole';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface QueriesTableProps {
  data: QueryData[];
  onRowClick?: (query: QueryData) => void;
  showTrends?: boolean;
}

export const QueriesTable: React.FC<QueriesTableProps> = ({ 
  data, 
  onRowClick,
  showTrends = false
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left p-4 font-medium text-gray-900">Query</th>
          <th className="text-right p-4 font-medium text-gray-900">Clicks</th>
          <th className="text-right p-4 font-medium text-gray-900">Impressions</th>
          <th className="text-right p-4 font-medium text-gray-900">CTR</th>
          <th className="text-right p-4 font-medium text-gray-900">Position</th>
          {showTrends && (
            <th className="text-right p-4 font-medium text-gray-900">Trend</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr 
            key={row.query} 
            className="border-b hover:bg-gray-50 cursor-pointer"
            onClick={() => onRowClick?.(row)}
          >
            <td className="p-4 text-gray-900">
              {row.query}
              {row.isNew && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                  New
                </span>
              )}
            </td>
            <td className="p-4 text-right text-blue-600 font-medium">
              {row.clicks.toLocaleString()}
            </td>
            <td className="p-4 text-right text-gray-900">
              {row.impressions.toLocaleString()}
            </td>
            <td className="p-4 text-right text-gray-900">
              {row.ctr.toFixed(1)}%
            </td>
            <td className="p-4 text-right text-gray-900">
              {row.position.toFixed(1)}
            </td>
            {showTrends && row.trend && (
              <td className="p-4 text-right">
                {row.trend === 'up' && (
                  <div className="flex items-center justify-end text-green-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                )}
                {row.trend === 'down' && (
                  <div className="flex items-center justify-end text-red-600">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                )}
                {row.trend === 'stable' && (
                  <div className="flex items-center justify-end text-gray-600">
                    <Minus className="w-4 h-4" />
                  </div>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
