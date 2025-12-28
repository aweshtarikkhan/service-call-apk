
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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 flex justify-between items-center z-50 pb-[env(safe-area-inset-bottom)] h-[calc(60px+env(safe-area-inset-bottom))] shadow-[0_-8px_20px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as ViewState)}
            className={`flex flex-col items-center justify-center gap-1 w-full transition-all ${
              isActive ? 'text-accent scale-105' : 'text-slate-400'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-80'}`}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;