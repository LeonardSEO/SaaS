import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Search, Database, PenTool, BarChart2, Settings } from 'lucide-react';
import Logo from './components/Logo';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Projects from './pages/Projects';
import SearchConsole from './pages/SearchConsole';
import DataTools from './pages/DataTools';
import ContentTools from './pages/ContentTools';
import RankIntelTools from './pages/RankIntelTools';
import SettingsPage from './pages/SettingsPage';

function App() {
  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Account Dashboard', path: '/' },
    { icon: <FileText size={20} />, label: 'Projects', path: '/projects' },
    { icon: <Search size={20} />, label: 'Search Console', path: '/search-console' },
    { icon: <Database size={20} />, label: 'Data Tools', path: '/data-tools' },
    { icon: <PenTool size={20} />, label: 'Content Tools', path: '/content-tools' },
    { icon: <BarChart2 size={20} />, label: 'Rank Intel. Tools', path: '/rank-intel-tools' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar logo={<Logo />} items={sidebarItems} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/search-console" element={<SearchConsole />} />
              <Route path="/data-tools" element={<DataTools />} />
              <Route path="/content-tools" element={<ContentTools />} />
              <Route path="/rank-intel-tools" element={<RankIntelTools />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;