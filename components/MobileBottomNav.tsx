
import React from 'react';
import { Home, Search, Calendar, User } from 'lucide-react';
import type { ViewState } from '../types';

interface MobileBottomNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isLoggedIn: boolean;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, onNavigate, isLoggedIn }) => {
  const navItems = [
    { id: 'HOME', label: 'Home', icon: Home },
    { id: 'SEARCH_RESULTS', label: 'Search', icon: Search },
    { id: 'BOOKINGS', label: 'Bookings', icon: Calendar },
    { id: 'DASHBOARD', label: isLoggedIn ? 'Account' : 'Login', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 flex justify-between items-center z-[1000] pb-[env(safe-area-inset-bottom)] h-[calc(72px+env(safe-area-inset-bottom))] shadow-[0_-8px_25px_rgba(0,0,0,0.08)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as ViewState)}
            className={`flex flex-col items-center justify-center gap-1.5 transition-all flex-1 py-1 ${
              isActive ? 'text-accent' : 'text-slate-400'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-accent/10' : ''}`}>
                <Icon size={20} strokeWidth={isActive ? 3 : 2} />
            </div>
            <span className={`text-[9px] font-black uppercase tracking-wider transition-opacity ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
