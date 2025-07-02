import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Check, AlertCircle, Key, User, Shield } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isChanging, setIsChanging] = useState(false);

  // Get current stored password
  const getStoredPassword = () => {
    return localStorage.getItem('admin_password') || 'cachopos';
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChanging(true);
    setMessage(null);

    // Validate current password
    if (currentPassword !== getStoredPassword()) {
      setMessage({ type: 'error', text: 'Palavra-passe atual incorreta.' });
      setIsChanging(false);
      return;
    }

    // Validate new password
    if (newPassword.length < 4) {
      setMessage({ type: 'error', text: 'A nova palavra-passe deve ter pelo menos 4 caracteres.' });
      setIsChanging(false);
      return;
    }

    // Validate password confirmation
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'A confirmação da palavra-passe não coincide.' });
      setIsChanging(false);
      return;
    }

    // Simulate processing delay
    setTimeout(() => {
      // Save new password to localStorage
      localStorage.setItem('admin_password', newPassword);
      
      setMessage({ type: 'success', text: 'Palavra-passe alterada com sucesso!' });
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsChanging(false);
    }, 1000);
  };

  const clearMessage = () => {
    setMessage(null);
  };

  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-white shadow-lg rounded-3xl overflow-hidden border-2 border-yellow-400/20">
          {/* Header */}
          <div className="bg-black px-12 py-16 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-yellow-400 p-4 rounded-xl">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                Definições
              </h2>
            </div>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-yellow-200 font-light">
              Configurações de segurança e conta administrativa
            </p>
          </div>

          <div className="p-12">
            {/* Account Info */}
            <div className="bg-amber-50 border-2 border-amber-100 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-black mb-6 flex items-center space-x-3">
                <User className="h-6 w-6 text-amber-600" />
                <span>Informações da Conta</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-black font-semibold text-sm tracking-wide mb-2 block">UTILIZADOR</label>
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-600">
                    admin
                  </div>
                  <p className="text-amber-600 text-sm mt-2">O nome de utilizador não pode ser alterado</p>
                </div>
                <div>
                  <label className="text-black font-semibold text-sm tracking-wide mb-2 block">TIPO DE CONTA</label>
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-600">
                    Administrador
                  </div>
                  <p className="text-amber-600 text-sm mt-2">Acesso total ao sistema</p>
                </div>
              </div>
            </div>

            {/* Password Change Form */}
            <div className="bg-white border-2 border-amber-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-black mb-6 flex items-center space-x-3">
                <Key className="h-6 w-6 text-amber-600" />
                <span>Alterar Palavra-passe</span>
              </h3>

              {message && (
                <div className={`mb-6 p-4 rounded-xl border-2 ${
                  message.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-700' 
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  <div className="flex items-center space-x-2">
                    {message.type === 'success' ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span className="font-medium">{message.text}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                    <Lock className="h-4 w-4" />
                    <span>PALAVRA-PASSE ATUAL</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => {
                        setCurrentPassword(e.target.value);
                        clearMessage();
                      }}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-all duration-300 pr-12"
                      placeholder="Digite a palavra-passe atual"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-700 transition-colors duration-300"
                    >
                      {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                    <Lock className="h-4 w-4" />
                    <span>NOVA PALAVRA-PASSE</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        clearMessage();
                      }}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-all duration-300 pr-12"
                      placeholder="Digite a nova palavra-passe"
                      required
                      minLength={4}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-700 transition-colors duration-300"
                    >
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-amber-600 text-sm">Mínimo de 4 caracteres</p>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                    <Lock className="h-4 w-4" />
                    <span>CONFIRMAR NOVA PALAVRA-PASSE</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        clearMessage();
                      }}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-all duration-300 pr-12"
                      placeholder="Confirme a nova palavra-passe"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-700 transition-colors duration-300"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isChanging || !currentPassword || !newPassword || !confirmPassword}
                    className="w-full px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isChanging ? 'A alterar...' : 'Alterar Palavra-passe'}
                  </button>
                </div>
              </form>
            </div>

            {/* Security Info */}
            <div className="mt-12 bg-blue-50 border-2 border-blue-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-black mb-4 flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Informações de Segurança</span>
              </h3>
              <div className="space-y-3 text-blue-700">
                <p className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>A palavra-passe é guardada localmente no seu navegador</span>
                </p>
                <p className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Use uma palavra-passe forte e única</span>
                </p>
                <p className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Faça logout sempre que terminar de usar o painel</span>
                </p>
                <p className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Não partilhe as suas credenciais com terceiros</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;