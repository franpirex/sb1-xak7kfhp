import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X, Settings, Edit, Heart } from 'lucide-react';
import { Booking } from '../types/booking';
import { storageUtils } from '../utils/storage';

interface CalendarProps {
  viewMode: 'client' | 'admin';
}

const Calendar: React.FC<CalendarProps> = ({ viewMode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAvailableModal, setShowAvailableModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editFormData, setEditFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    eventType: '',
    venue: '',
    duration: 60,
    budget: '',
    message: ''
  });

  useEffect(() => {
    setBookings(storageUtils.getBookings());
  }, []);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

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

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getBookingStatus = (dateString: string) => {
    const dayBookings = storageUtils.getBookingsForDate(dateString);
    if (dayBookings.length === 0) return null;
    
    const hasBooked = dayBookings.some(b => b.status === 'booked');
    if (hasBooked) return 'booked';
    
    return null;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (dateString: string) => {
    const status = getBookingStatus(dateString);
    
    if (viewMode === 'client') {
      if (!status) {
        // Date is available - show available modal
        setSelectedDate(dateString);
        setShowAvailableModal(true);
      }
      // If date is booked, do nothing for client
    } else {
      // Admin view - show details
      setSelectedDate(dateString);
    }
  };

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    setEditFormData({
      clientName: booking.clientName,
      clientEmail: booking.clientEmail,
      clientPhone: booking.clientPhone,
      eventType: booking.eventType,
      venue: booking.venue,
      duration: booking.duration,
      budget: booking.budget,
      message: booking.message
    });
  };

  const handleSaveEdit = () => {
    if (!editingBooking) return;

    storageUtils.updateBooking(editingBooking.id, editFormData);
    setBookings(storageUtils.getBookings());
    setEditingBooking(null);
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (confirm('Tem certeza que deseja eliminar esta reserva?')) {
      const bookings = storageUtils.getBookings();
      const updatedBookings = bookings.filter(b => b.id !== bookingId);
      storageUtils.saveBookings(updatedBookings);
      setBookings(updatedBookings);
    }
  };

  const handleInterest = () => {
    setShowAvailableModal(false);
    // Redirect to booking form
    window.location.hash = '#booking';
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const todayString = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 md:h-32"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(year, month, day);
      const status = getBookingStatus(dateString);
      const isToday = dateString === todayString;
      const isPast = new Date(dateString) < today;

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(dateString)}
          className={`h-24 md:h-32 border-2 border-amber-100 cursor-pointer transition-all duration-300 hover:border-yellow-400 relative rounded-xl ${
            isToday ? 'bg-yellow-50 border-yellow-400' : 'bg-white'
          } ${isPast ? 'opacity-50' : ''}`}
        >
          <div className="p-3 h-full flex flex-col">
            <div className={`text-sm font-bold ${isToday ? 'text-yellow-600' : 'text-black'} mb-2`}>
              {day}
            </div>
            
            {status === 'booked' && (
              <div className="flex-1 flex items-center justify-center">
                <span className="text-amber-600 text-xs font-bold bg-amber-100 px-2 py-1 rounded-full">RESERVADO</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedDateBookings = selectedDate ? storageUtils.getBookingsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-white shadow-lg rounded-3xl overflow-hidden border-2 border-yellow-400/20">
          {/* Header */}
          <div className="bg-black px-12 py-16 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter flex items-center justify-center space-x-4">
              <CalendarIcon className="h-12 w-12" />
              <span>Calendário</span>
            </h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-yellow-200 font-light">
              {viewMode === 'client' 
                ? 'Verifique a nossa disponibilidade para a data do seu evento'
                : 'Gerir contratações e acompanhar disponibilidade'
              }
            </p>
          </div>

          <div className="p-12">
            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-12">
              <button
                onClick={() => navigateMonth('prev')}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-amber-200 text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="font-semibold">Anterior</span>
              </button>
              
              <h3 className="text-4xl font-black text-black tracking-tight">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              
              <button
                onClick={() => navigateMonth('next')}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-amber-200 text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-300"
              >
                <span className="font-semibold">Próximo</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white border-2 border-amber-100 rounded-2xl overflow-hidden">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-0 border-b-2 border-amber-100">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="h-12 flex items-center justify-center text-amber-700 font-bold text-sm bg-amber-50">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-0">
                {renderCalendarDays()}
              </div>
            </div>

            {/* Admin Selected Date Details */}
            {viewMode === 'admin' && selectedDate && (
              <div className="mt-12 bg-white border-2 border-amber-100 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-3xl font-black text-black">
                    {new Date(selectedDate).toLocaleDateString('pt-PT', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h4>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="p-2 text-amber-500 hover:bg-amber-100 rounded-xl transition-colors duration-300"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {selectedDateBookings.length > 0 ? (
                  <div className="space-y-6">
                    {selectedDateBookings.map(booking => (
                      <div key={booking.id} className="bg-amber-50 border-2 border-amber-100 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="text-xl font-bold text-black">{booking.clientName}</h5>
                          <div className="flex items-center space-x-3">
                            <span className={`px-4 py-2 text-sm font-semibold rounded-full ${
                              booking.status === 'booked' ? 'bg-amber-100 text-amber-800' :
                              booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status === 'booked' ? 'Reservado' :
                               booking.status === 'approved' ? 'Aprovado' :
                               booking.status === 'pending' ? 'Pendente' :
                               booking.status}
                            </span>
                            <button
                              onClick={() => handleEditBooking(booking)}
                              className="p-2 text-amber-500 hover:text-amber-700 rounded-xl transition-colors duration-300"
                              title="Editar reserva"
                            >
                              <Settings className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="p-2 text-red-500 hover:text-red-700 rounded-xl transition-colors duration-300"
                              title="Eliminar reserva"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <div className="text-amber-700 space-y-2">
                          <p><strong>Evento:</strong> {booking.eventType}</p>
                          <p><strong>Local:</strong> {booking.venue}</p>
                          <p><strong>Duração:</strong> {booking.duration} minutos</p>
                          <p><strong>Contacto:</strong> {booking.clientEmail}</p>
                          <p><strong>Telefone:</strong> {booking.clientPhone}</p>
                          <p><strong>Orçamento:</strong> €{booking.budget}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-8xl mb-6">📅</div>
                    <p className="text-2xl font-bold text-black mb-2">Nenhuma contratação para esta data</p>
                    <p className="text-amber-600">Esta data está disponível para contratação!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Available Date Modal for Clients */}
        {showAvailableModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white max-w-md w-full rounded-3xl border-2 border-yellow-400/20 text-center p-8">
              <div className="text-6xl mb-6">😊</div>
              <h3 className="text-2xl font-black text-black mb-4">Esta data parece que está disponível!!</h3>
              <p className="text-amber-700 mb-8">
                {selectedDate && new Date(selectedDate).toLocaleDateString('pt-PT', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleInterest}
                  className="flex-1 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300"
                >
                  Tenho interesse
                </button>
                <button
                  onClick={() => setShowAvailableModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-amber-200 text-amber-700 font-semibold rounded-full hover:bg-amber-50 transition-all duration-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Booking Modal */}
        {editingBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-yellow-400/20">
              <div className="bg-black px-8 py-8 text-center">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <Edit className="h-8 w-8 text-white" />
                  <h3 className="text-3xl font-black text-white tracking-tight">Editar Reserva</h3>
                </div>
                <p className="text-yellow-200">Modificar detalhes da reserva</p>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">NOME DO CLIENTE</label>
                    <input
                      type="text"
                      value={editFormData.clientName}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">EMAIL</label>
                    <input
                      type="email"
                      value={editFormData.clientEmail}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">TELEFONE</label>
                    <input
                      type="tel"
                      value={editFormData.clientPhone}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">TIPO DE EVENTO</label>
                    <select
                      value={editFormData.eventType}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, eventType: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                    >
                      {eventTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">LOCAL</label>
                    <input
                      type="text"
                      value={editFormData.venue}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, venue: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">DURAÇÃO</label>
                    <select
                      value={editFormData.duration}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                    >
                      {durationOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-black font-semibold text-sm tracking-wide">ORÇAMENTO (€)</label>
                  <input
                    type="text"
                    value={editFormData.budget}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, '').slice(0, 5);
                      setEditFormData(prev => ({ ...prev, budget: numericValue }));
                    }}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                    placeholder="1500"
                    maxLength={5}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-black font-semibold text-sm tracking-wide">NOTAS ADICIONAIS</label>
                  <textarea
                    value={editFormData.message}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none resize-none"
                  />
                </div>
                
                <div className="flex space-x-4 pt-6">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300"
                  >
                    Guardar Alterações
                  </button>
                  <button
                    onClick={() => setEditingBooking(null)}
                    className="flex-1 px-6 py-3 border-2 border-amber-200 text-amber-700 font-semibold rounded-full hover:bg-amber-50 transition-all duration-300"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;