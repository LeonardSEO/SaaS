import React from 'react';

const WebsiteTable: React.FC = () => (
  <div className="bg-gradient shadow overflow-hidden sm:rounded-lg">
    <table className="min-w-full divide-y divide-gray-700">
      <thead className="bg-black bg-opacity-20">
        <tr>
          {['WEBSITE', 'CLICKS', 'IMPRESSIONS', 'CTR', 'POSITION', 'QUERIES', 'FETCH STATUS', 'ACTIONS'].map((header) => (
            <th
              key={header}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-black bg-opacity-10 divide-y divide-gray-700">
        <tr>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center" colSpan={8}>
            No data
          </td>
        </tr>
      </tbody>
    </table>
    <div className="bg-black bg-opacity-20 px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-black bg-opacity-20 hover:bg-opacity-30 hover-effect">
          Previous
        </a>
        <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-black bg-opacity-20 hover:bg-opacity-30 hover-effect">
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-300">
            Showing <span className="font-medium">0</span> to <span className="font-medium">0</span> of{' '}
            <span className="font-medium">0</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-black bg-opacity-20 text-sm font-medium text-gray-300 hover:bg-opacity-30 hover-effect">
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-black bg-opacity-20 text-sm font-medium text-gray-300 hover:bg-opacity-30 hover-effect">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
);

export default WebsiteTable;