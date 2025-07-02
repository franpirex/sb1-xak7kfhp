import React from 'react';
import { Zap } from 'lucide-react';

interface HeaderProps {
  viewMode: 'client';
  onViewModeChange: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-amber-200 fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-400 p-2.5 rounded-xl shadow-sm">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-black tracking-tight">Raio dos Cachopos</h1>
              <p className="text-amber-600 text-xs font-medium tracking-wide">POP TRADICIONAL AGROBETO</p>
            </div>
          </div>

          <nav className="flex items-center space-x-1">
            <button
              onClick={() => onSectionChange('home')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'home'
                  ? 'bg-yellow-400 text-black shadow-sm'
                  : 'text-amber-700 hover:text-black hover:bg-amber-50'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => onSectionChange('booking')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'booking'
                  ? 'bg-yellow-400 text-black shadow-sm'
                  : 'text-amber-700 hover:text-black hover:bg-amber-50'
              }`}
            >
              Pedir Orçamento
            </button>
            <button
              onClick={() => onSectionChange('calendar')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'calendar'
                  ? 'bg-yellow-400 text-black shadow-sm'
                  : 'text-amber-700 hover:text-black hover:bg-amber-50'
              }`}
            >
              Disponibilidade
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;