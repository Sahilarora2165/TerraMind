import React, { useState } from 'react';
import { 
  Leaf, 
  Sprout, 
  ShieldAlert, 
  Store, 
  Home as HomeIcon,
  Menu,
  X,
  MessageSquare,
  Users
} from 'lucide-react';
import { Section } from './types';
import Home from './components/Home';
import AgriAdvisor from './components/AgriAdvisor';
import Diagnostics from './components/Diagnostics';
import Marketplace from './components/Marketplace';
import ChatAssistant from './components/ChatAssistant';
import CommunityForum from './components/CommunityForum';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Home);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: Section.Home, icon: HomeIcon, label: 'Home' },
    { id: Section.Advisor, icon: Sprout, label: 'Agri-Advisor' },
    { id: Section.Chat, icon: MessageSquare, label: 'AI Chat Assistant' },
    { id: Section.Forum, icon: Users, label: 'Community Forum' },
    { id: Section.Diagnostics, icon: ShieldAlert, label: 'AI Diagnostics' },
    { id: Section.Marketplace, icon: Store, label: 'Marketplace' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <Leaf className="text-emerald-600" />
          <span className="font-heading text-xl font-bold text-emerald-900">TerraMind</span>
        </div>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6 text-slate-600" />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-white border-r z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Leaf className="text-emerald-600 w-8 h-8" />
              <span className="font-heading text-2xl font-bold text-emerald-900">TerraMind</span>
            </div>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === item.id 
                    ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-emerald-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:p-8 pt-20 p-4 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {activeSection === Section.Home && <Home onNavigate={setActiveSection} />}
          {activeSection === Section.Advisor && <AgriAdvisor />}
          {activeSection === Section.Chat && <ChatAssistant />}
          {activeSection === Section.Forum && <CommunityForum />}
          {activeSection === Section.Diagnostics && <Diagnostics />}
          {activeSection === Section.Marketplace && <Marketplace />}
        </div>
      </main>
    </div>
  );
};

export default App;