import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  logo: React.ReactNode;
  items: { icon: React.ReactNode; label: string; path: string }[];
}

interface SidebarProps {
  logo: React.ReactNode;
  items: { icon: React.ReactNode; label: string; path: string }[];
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  logo, 
  items, 
  isExpanded, 
  onExpandedChange 
}) => {
  const location = useLocation();

  const toggleSidebar = () => {
    onExpandedChange(!isExpanded);
  };

  return (
    <div
      className={`bg-[#4F46E5] text-white h-screen ${
        isExpanded ? 'w-64' : 'w-16'
      } transition-all duration-300 ease-in-out fixed left-0 top-0 z-50`}
    >
      <div className={`flex flex-col items-center border-b border-[#3D3A63] ${
        isExpanded ? 'h-16' : 'h-24' // Taller when collapsed to accommodate both logo and button
      }`}>
        <div className={`flex justify-center items-center transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'h-16 w-full' 
            : 'h-16 w-full' // Full height for logo when collapsed
        }`}>
          {logo}
        </div>
        <button
          onClick={toggleSidebar}
          className={`p-2 hover:bg-[#4338CA] transition-colors rounded-lg ${
            isExpanded 
              ? 'absolute right-2' 
              : 'w-10 h-8 flex items-center justify-center' // Centered button below logo when collapsed
          }`}
        >
          {isExpanded ? (
            <ChevronLeft size={20} className="text-gray-300" />
          ) : (
            <ChevronRight size={20} className="text-gray-300" />
          )}
        </button>
      </div>
      <nav className="mt-4">
        {items.map((item, index) => (
          <div key={index} className="relative group">
            <Link
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
              <span
                className={`ml-4 text-sm font-medium text-gray-300 whitespace-nowrap transition-all duration-300 ease-in-out ${
                  isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute'
                }`}
              >
                {item.label}
              </span>
            </Link>
            {/* Tooltip on hover when collapsed */}
            {!isExpanded && (
              <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className={`absolute bottom-4 left-0 right-0 px-4 ${isExpanded ? '' : 'flex justify-center'}`}>
        <button className="flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
          <LogOut size={20} />
          <span
            className={`ml-4 whitespace-nowrap transition-all duration-300 ease-in-out ${
              isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute'
            }`}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
