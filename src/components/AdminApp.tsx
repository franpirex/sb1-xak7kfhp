import React, { useState } from 'react';
import { LogOut, Zap, Settings } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import Calendar from './Calendar';
import AdminSettings from './AdminSettings';

interface AdminAppProps {
  onLogout: () => void;
}

const AdminApp: React.FC<AdminAppProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen bg-white">
      {/* Admin Header */}
      <header className="bg-black/90 backdrop-blur-xl border-b border-yellow-400/20 fixed w-full top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-400 p-2.5 rounded-xl shadow-sm">
                <Zap className="h-5 w-5 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white tracking-tight">Raio dos Cachopos</h1>
                <p className="text-yellow-400 text-xs font-medium tracking-wide">PAINEL ADMINISTRATIVO</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === 'dashboard'
                    ? 'bg-yellow-400 text-black shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Painel
              </button>
              <button
                onClick={() => setActiveSection('calendar')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === 'calendar'
                    ? 'bg-yellow-400 text-black shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Calendário
              </button>
              <button
                onClick={() => setActiveSection('settings')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === 'settings'
                    ? 'bg-yellow-400 text-black shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Definições
              </button>
            </nav>

            <div className="flex items-center space-x-2">
              {/* Mobile Settings Button */}
              <button
                onClick={() => setActiveSection('settings')}
                className={`md:hidden p-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === 'settings'
                    ? 'bg-yellow-400 text-black shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Settings className="h-4 w-4" />
              </button>
              
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {activeSection === 'dashboard' && <AdminDashboard />}
      {activeSection === 'calendar' && <Calendar viewMode="admin" />}
      {activeSection === 'settings' && <AdminSettings />}
    </div>
  );
};

export default AdminApp;