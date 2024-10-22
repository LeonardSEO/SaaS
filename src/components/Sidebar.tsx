import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface SidebarProps {
  logo: React.ReactNode;
  items: { icon: React.ReactNode; label: string; path: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ logo, items }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-[#4F46E5] text-white h-screen ${
        isExpanded ? 'w-64' : 'w-16'
      } transition-all duration-500 ease-in-out fixed left-0 top-0 z-50`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center justify-center h-16 border-b border-[#3D3A63] overflow-hidden">
        <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'scale-100' : 'scale-75'}`}>
          {logo}
        </div>
      </div>
      <nav className="mt-4">
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center py-3 px-4 ${
              location.pathname === item.path
                ? 'bg-[#4338CA]'
                : 'hover:bg-[#6366F1]'
            } transition-all duration-300 ease-in-out`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {React.cloneElement(item.icon as React.ReactElement, { 
                size: 20, 
                className: 'text-gray-300'
              })}
            </div>
            <span className={`ml-4 text-sm font-medium text-gray-300 whitespace-nowrap transition-all duration-500 ease-in-out ${
              isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute'
            }`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
      <div className={`absolute bottom-4 left-0 right-0 px-4 ${isExpanded ? '' : 'flex justify-center'}`}>
        <button className="flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
          <LogOut size={20} />
          <span className={`ml-4 whitespace-nowrap transition-all duration-500 ease-in-out ${
            isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute'
          }`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
