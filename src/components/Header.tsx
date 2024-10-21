import React from 'react';
import { MessageSquare, Clock, Settings, Bell } from 'lucide-react';

const Header: React.FC = () => (
  <header className="bg-gradient shadow-sm">
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white text-shadow">Account Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white hover-effect">
            <MessageSquare size={20} />
          </button>
          <button className="text-gray-300 hover:text-white hover-effect">
            <Clock size={20} />
          </button>
          <button className="text-gray-300 hover:text-white hover-effect">
            <Settings size={20} />
          </button>
          <button className="text-gray-300 hover:text-white hover-effect">
            <Bell size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-300">Leonard</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;