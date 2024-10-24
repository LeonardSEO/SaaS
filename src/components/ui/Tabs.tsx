import React, { useState } from 'react';

interface TabsProps {
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  return <div>{children}</div>;
};

export const TabsList: React.FC<TabsListProps> = ({ children }) => {
  return <div className="flex">{children}</div>;
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, onClick, isActive, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, activeValue, children }) => {
  return value === activeValue ? <div>{children}</div> : null;
};
