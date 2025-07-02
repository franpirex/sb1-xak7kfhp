import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, Zap, Globe, Monitor } from 'lucide-react';
import AdminApp from './AdminApp';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: 'admin',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Get stored password or use default
  const getStoredPassword = () => {
    return localStorage.getItem('admin_password') || 'cachopos';
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const storedPassword = getStoredPassword();
    
    if (credentials.username === 'admin' && credentials.password === storedPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow password changes, username is fixed
    if (name === 'password') {
      setCredentials(prev => ({ ...prev, [name]: value }));
      if (error) setError('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Clear password but keep username as admin
    setCredentials({
      username: 'admin',
      password: ''
    });
    setError('');
  };

  const goToMainSite = () => {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      // Local development - remove admin parameter and hash
      window.location.href = window.location.origin;
    } else {
      // Production - go to main domain
      const mainDomain = hostname.replace('admin.', '');
      window.location.href = `https://${mainDomain}`;
    }
  };

  const isLocalDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  if (isAuthenticated) {
    return <AdminApp onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border-2 border-yellow-400/20">
          {/* Header */}
          <div className="bg-black px-8 py-12 text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-yellow-400 p-3 rounded-xl">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-white">Raio dos Cachopos</h1>
                <p className="text-yellow-400 text-sm font-medium">PAINEL ADMINISTRATIVO</p>
              </div>
            </div>
            <div className="w-12 h-1 bg-yellow-400 mx-auto mb-4"></div>
            
            {isLocalDevelopment ? (
              <div className="bg-blue-900/50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Monitor className="h-4 w-4 text-blue-300" />
                  <span className="text-blue-300 text-sm font-medium">MODO DESENVOLVIMENTO</span>
                </div>
                <p className="text-blue-200 text-xs">
                  URL: <span className="font-mono">{window.location.href}</span>
                </p>
              </div>
            ) : (
              <p className="text-yellow-200 text-sm">
                Acesso via subdomínio: <span className="font-mono text-yellow-400">admin.raiodoscachopos.com</span>
              </p>
            )}
          </div>

          {/* Login Form */}
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="bg-amber-100 p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4 rounded-full">
                <Lock className="h-10 w-10 text-amber-600" />
              </div>
              <h2 className="text-2xl font-black text-black mb-2">Iniciar Sessão</h2>
              <p className="text-amber-600">Área restrita a administradores</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                  <User className="h-4 w-4" />
                  <span>UTILIZADOR</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-xl border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none"
                  placeholder="admin"
                  readOnly
                  disabled
                />
                <p className="text-amber-600 text-xs">Campo fixo - não editável</p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                  <Lock className="h-4 w-4" />
                  <span>PALAVRA-PASSE</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl pr-12 ${
                      error ? 'border-red-400' : 'border-amber-200'
                    } focus:border-yellow-400 focus:outline-none transition-all duration-300`}
                    placeholder="Palavra-passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-700 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm font-medium text-center">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Entrar no Painel
              </button>
            </form>

            <div className="mt-6">
              <button
                onClick={goToMainSite}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 border-2 border-amber-200 text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-300"
              >
                <Globe className="h-5 w-5" />
                <span>Ir para o Site Principal</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-amber-100 text-center">
              <p className="text-amber-600 text-sm">
                Painel administrativo dos Raio dos Cachopos
              </p>
              <p className="text-amber-500 text-xs mt-2">
                Acesso restrito apenas a administradores autorizados
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-amber-600 text-sm">
            © 2024 Raio dos Cachopos. Painel Administrativo.
          </p>
          <p className="text-amber-500 text-xs mt-1">
            {isLocalDevelopment ? 'Desenvolvimento Local' : `Subdomínio: ${window.location.hostname}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;