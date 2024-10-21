import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface SidebarProps {
  logo: React.ReactNode;
  items: { icon: React.ReactNode; label: string; path: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ logo, items }) => {
  const location = useLocation();

  return (
    <div className="bg-gradient w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      {logo}
      <nav>
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover-effect ${
              location.pathname === item.path
                ? 'bg-white bg-opacity-10 text-white'
                : 'text-gray-300 hover:bg-white hover:bg-opacity-5'
            }`}
          >
            {item.icon}
            <span className="text-shadow">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="px-4 mt-auto">
        <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-200 hover-effect">
          <LogOut size={20} />
          <span className="text-shadow">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;