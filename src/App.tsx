import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { 
  LayoutDashboard, 
  KeyRound, 
  Sparkles, 
  Target, 
  Settings 
} from 'lucide-react';
import Logo from './components/Logo';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import KeywordsHub from './pages/KeywordsHub'; // renamed from DataTools
import AIGenerator from './pages/AIGenerator'; // renamed from ContentTools
import Campaigns from './pages/Campaigns'; // renamed from Projects
import SettingsPage from './pages/SettingsPage';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  
  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <KeyRound size={20} />, label: 'Keywords Hub', path: '/keywords-hub' },
    { icon: <Sparkles size={20} />, label: 'AI Generator', path: '/ai-generator' },
    { icon: <Target size={20} />, label: 'Campaigns', path: '/campaigns' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          logo={<Logo />} 
          items={sidebarItems}
          isExpanded={isSidebarExpanded}
          onExpandedChange={setIsSidebarExpanded}
        />
        <div
          className={`flex-1 min-w-0 transition-all duration-300 ease-in-out ${
            isSidebarExpanded ? 'ml-64' : 'ml-16'
          }`}
        >
          <Header />
          <main className="p-6 overflow-y-auto h-[calc(100vh-4rem)]">
            <div className="min-w-0">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/keywords-hub" element={<KeywordsHub />} />
                <Route path="/ai-generator" element={<AIGenerator />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
