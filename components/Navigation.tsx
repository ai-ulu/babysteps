
import React from 'react';
import { Home, Book, Activity, Ruler, MessageCircleHeart } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  themeColor: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, themeColor }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Özet' },
    { id: 'diary', icon: Book, label: 'Günlük' },
    { id: 'growth', icon: Ruler, label: 'Gelişim' },
    { id: 'health', icon: Activity, label: 'Aşılar' },
    { id: 'ai-chat', icon: MessageCircleHeart, label: 'Asistan' },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-${themeColor}-100 pb-safe pt-2 px-4 shadow-lg z-50`}>
      <div className="flex justify-between items-center max-w-md mx-auto h-16">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewState)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 relative group outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-${themeColor}-400 rounded-xl ${
                isActive ? `text-${themeColor}-500 scale-110` : `text-slate-400 hover:text-${themeColor}-300`
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? `bg-${themeColor}-50 shadow-sm shadow-${themeColor}-100/50` : 'bg-transparent'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold transition-all ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>{item.label}</span>
              {isActive && (
                <div className={`absolute -top-1 w-1 h-1 bg-${themeColor}-500 rounded-full`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;