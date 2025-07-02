import React, { useState } from 'react';
import { Calendar, Mail, Phone, MapPin, Clock, Banknote, MessageCircle } from 'lucide-react';
import { Booking } from '../types/booking';
import { storageUtils } from '../utils/storage';

interface BookingFormProps {
  onSubmit: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    eventDate: '',
    eventType: '',
    venue: '',
    duration: 60,
    guests: 50,
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventTypes = [
    'Casamento',
    'Festa de Aniversário',
    'Evento Corporativo',
    'Festa Privada',
    'Festival',
    'Concerto',
    'Celebração Familiar',
    'Outro'
  ];

  const durationOptions = [
    { value: 45, label: '45 minutos' },
    { value: 60, label: '60 minutos' },
    { value: 90, label: '90 minutos' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) newErrors.clientName = 'Nome é obrigatório';
    if (!formData.clientEmail.trim()) newErrors.clientEmail = 'Email é obrigatório';
    if (!formData.clientPhone.trim()) newErrors.clientPhone = 'Telefone é obrigatório';
    if (!formData.eventDate) newErrors.eventDate = 'Data do evento é obrigatória';
    if (!formData.eventType) newErrors.eventType = 'Tipo de evento é obrigatório';
    if (!formData.venue.trim()) newErrors.venue = 'Local é obrigatório';
    if (!formData.duration) newErrors.duration = 'Duração é obrigatória';
    if (!formData.budget.trim()) newErrors.budget = 'Orçamento é obrigatório';

    // Check if date is in the past
    if (formData.eventDate && new Date(formData.eventDate) < new Date()) {
      newErrors.eventDate = 'A data do evento não pode ser no passado';
    }

    // Check if date is already booked
    if (formData.eventDate && storageUtils.isDateBooked(formData.eventDate)) {
      newErrors.eventDate = 'Esta data já está reservada. Por favor escolha outra data.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.clientEmail && !emailRegex.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Por favor insira um email válido';
    }

    // Budget validation - only numbers up to 5 digits
    const budgetRegex = /^\d{1,5}$/;
    if (formData.budget && !budgetRegex.test(formData.budget)) {
      newErrors.budget = 'Orçamento deve conter apenas números (máximo 5 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const booking: Booking = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending',
        proposalSent: false,
        createdAt: new Date().toISOString()
      };

      storageUtils.addBooking(booking);
      
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit();
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special handling for budget field - only allow numbers
    if (name === 'budget') {
      const numericValue = value.replace(/\D/g, '').slice(0, 5);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: name === 'duration' ? parseInt(value) : value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-white shadow-lg rounded-3xl overflow-hidden border-2 border-yellow-400/20">
          <div className="bg-black px-12 py-16 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
              Pedir Orçamento
            </h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-yellow-200 font-light max-w-2xl mx-auto">
              Vamos tornar o seu evento inesquecível. Preencha os detalhes abaixo e entraremos em contacto em 24 horas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-12 space-y-8">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                  <Mail className="h-4 w-4" />
                  <span>NOME COMPLETO</span>
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl ${
                    errors.clientName ? 'border-red-400' : 'border-amber-200'
                  } focus:border-yellow-400 focus:outline-none transition-all duration-300 text-lg`}
                  placeholder="O seu nome completo"
                />
                {errors.clientName && <p className="text-red-500 text-sm font-medium">{errors.clientName}</p>}
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                  <Mail className="h-4 w-4" />
                  <span>EMAIL</span>
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl ${
                    errors.clientEmail ? 'border-red-400' : 'border-amber-200'
                  } focus:border-yellow-400 focus:outline-none transition-all duration-300 text-lg`}
                  placeholder="seu.email@exemplo.com"
                />
                {errors.clientEmail && <p className="text-red-500 text-sm font-medium">{errors.clientEmail}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                  <Phone className="h-4 w-4" />
                  <span>TELEFONE</span>
                </label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl ${
                    errors.clientPhone ? 'border-red-400' : 'border-amber-200'
                  } focus:border-yellow-400 focus:outline-none transition-all duration-300 text-lg`}
                  placeholder="912 345 678"
                />
                {errors.clientPhone && <p className="text-red-500 text-sm font-medium">{errors.clientPhone}</p>}
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                  <Calendar className="h-4 w-4" />
                  <span>DATA DO EVENTO</span>
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  min={today}
                  className={`w-full px-6 py-4 border-2 rounded-2xl ${
                    errors.eventDate ? 'border-red-400' : 'border-amber-200'
                  } focus:border-yellow-400 focus:outline-none transition-all duration-300 text-lg`}
                />
                {errors.eventDate && <p className="text-red-500 text-sm font-medium">{errors.eventDate}</p>}
              </div>
            </div>

            {/* Event Details */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                  <Calendar className="h-4 w-4" />
                  <span>TIPO DE EVENTO</span>
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl ${
                    errors.eventType ? 'border-red-400' : 'border-amber-200'
                  } focus:border-yellow-400 focus:outline-none transition-all duration-300 text-lg`}
                >
                  <option value="">Selecione o tipo de evento</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.eventType && <p className="text-red-500 text-sm font-medium">{errors.eventType}</p>}
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                  <MapPin className="h-4 w-4" />
                  <span>LOCAL</span>
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl ${
                    errors.venue ? 'border-red-400' : 'border-amber-200'
                  } focus:border-yellow-400 focus:outline-none transition-all duration-300 text-lg`}
                  placeholder="Nome do local ou morada"
                />
                {errors.venue && <p className="text-red-500 text-sm font-medium">{errors.venue}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                  <Clock className="h-4 w-4" />
                  <span>DURAÇÃO</span>
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl ${
                    errors.duration ? 'border-red-400' : 'border-amber-200'
                  } focus:border-yellow-400 focus:outline-none transition-all duration-300 text-lg`}
                >
                  {durationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.duration && <p className="text-red-500 text-sm font-medium">{errors.duration}</p>}
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                  <Banknote className="h-4 w-4" />
                  <span>ORÇAMENTO (€)</span>
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-4 border-2 rounded-2xl ${
                    errors.budget ? 'border-red-400' : 'border-amber-200'
                  } focus:border-yellow-400 focus:outline-none transition-all duration-300 text-lg`}
                  placeholder="1500"
                  maxLength={5}
                />
                {errors.budget && <p className="text-red-500 text-sm font-medium">{errors.budget}</p>}
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-black font-semibold text-sm tracking-wide">
                <MessageCircle className="h-4 w-4" />
                <span>DETALHES ADICIONAIS</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-6 py-4 border-2 border-amber-200 rounded-2xl focus:border-yellow-400 focus:outline-none transition-all duration-300 resize-none text-lg"
                placeholder="Conte-nos mais sobre o seu evento, pedidos especiais, preferências musicais, ou outros detalhes..."
              />
            </div>

            <div className="flex justify-center pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-12 py-4 bg-yellow-400 text-black font-semibold text-lg rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'A Enviar...' : 'Enviar Pedido'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;