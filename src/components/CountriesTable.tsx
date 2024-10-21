import React from 'react';

const CountriesTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impressions</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Add table rows here */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">United States</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">500</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10%</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4.2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CountriesTable;