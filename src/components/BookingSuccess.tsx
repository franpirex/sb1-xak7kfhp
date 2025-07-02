import React from 'react';
import { CheckCircle, Home, Calendar } from 'lucide-react';

interface BookingSuccessProps {
  onBackToHome: () => void;
  onViewCalendar: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ onBackToHome, onViewCalendar }) => {
  return (
    <div className="min-h-screen bg-amber-50 pt-20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <div className="bg-white shadow-lg rounded-3xl p-16 border-2 border-yellow-400/20">
          <div className="bg-green-100 p-8 w-32 h-32 flex items-center justify-center mx-auto mb-12 rounded-full">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-black mb-8 tracking-tighter">
            Pedido Enviado!
          </h2>
          
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-8"></div>
          
          <p className="text-xl text-amber-700 mb-4 font-medium">
            Obrigado por escolher os Raio dos Cachopos para o seu evento especial.
          </p>
          
          <p className="text-lg text-amber-600 mb-12">
            Recebemos o seu pedido de contratação e entraremos em contacto consigo em 24 horas com uma proposta personalizada.
          </p>
          
          <div className="bg-amber-50 border-2 border-amber-100 rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-bold text-black mb-6">O que acontece a seguir?</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-400 text-black w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold rounded-full">
                  1
                </div>
                <p className="text-amber-700 font-medium">A nossa equipa irá rever o seu pedido e verificar a disponibilidade</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-400 text-black w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold rounded-full">
                  2
                </div>
                <p className="text-amber-700 font-medium">Criaremos uma proposta personalizada para o seu evento</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-400 text-black w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold rounded-full">
                  3
                </div>
                <p className="text-amber-700 font-medium">Receberá a nossa proposta por email em 24 horas</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBackToHome}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Home className="h-5 w-5" />
              <span>Voltar ao Início</span>
            </button>
            
            <button
              onClick={onViewCalendar}
              className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-amber-200 text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-300"
            >
              <Calendar className="h-5 w-5" />
              <span>Ver Calendário</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;