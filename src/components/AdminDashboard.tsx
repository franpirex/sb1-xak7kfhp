import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Banknote, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Send,
  Eye,
  Filter,
  Plus,
  Upload,
  Edit,
  Settings,
  ExternalLink,
  FileSpreadsheet,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  User,
  Trash2
} from 'lucide-react';
import { Booking, Proposal } from '../types/booking';
import { storageUtils } from '../utils/storage';

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showManualBookingForm, setShowManualBookingForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [manualBookingData, setManualBookingData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    eventDate: '',
    eventType: '',
    venue: '',
    duration: 60,
    budget: '',
    message: ''
  });
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
    loadBookings();
  }, []);

  const loadBookings = () => {
    const allBookings = storageUtils.getBookings().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setBookings(allBookings);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    storageUtils.updateBooking(id, { status });
    loadBookings();
  };

  const deleteBooking = (id: string, clientName: string) => {
    if (confirm(`Tem certeza que deseja apagar definitivamente a reserva de ${clientName}?\n\nEsta ação não pode ser desfeita.`)) {
      const allBookings = storageUtils.getBookings();
      const updatedBookings = allBookings.filter(booking => booking.id !== id);
      storageUtils.saveBookings(updatedBookings);
      loadBookings();
      
      // Close details if this booking was selected
      if (selectedBooking?.id === id) {
        setSelectedBooking(null);
      }
    }
  };

  const addManualBooking = () => {
    if (!manualBookingData.clientName || !manualBookingData.eventDate || !manualBookingData.eventType) return;

    const booking: Booking = {
      id: Date.now().toString(),
      ...manualBookingData,
      guests: 0, // Not used anymore but keeping for compatibility
      status: 'booked', // Manually added bookings are already confirmed
      proposalSent: true,
      createdAt: new Date().toISOString()
    };

    storageUtils.addBooking(booking);
    setShowManualBookingForm(false);
    setManualBookingData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      eventDate: '',
      eventType: '',
      venue: '',
      duration: 60,
      budget: '',
      message: ''
    });
    loadBookings();
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
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
    setShowEditForm(true);
  };

  const saveEditedBooking = () => {
    if (!selectedBooking) return;

    storageUtils.updateBooking(selectedBooking.id, editFormData);
    setShowEditForm(false);
    setSelectedBooking(null);
    loadBookings();
  };

  const handleApproveBooking = (booking: Booking) => {
    // When approved, immediately mark as booked (no proposal step)
    updateBookingStatus(booking.id, 'booked');
  };

  const handleRejectBooking = (booking: Booking) => {
    if (confirm(`Tem certeza que deseja recusar o pedido de ${booking.clientName}?`)) {
      updateBookingStatus(booking.id, 'rejected');
    }
  };

  const filteredBookings = bookings.filter(booking => 
    filterStatus === 'all' || booking.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'booked': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusCount = (status: string) => {
    return bookings.filter(b => b.status === status).length;
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'approved': return 'Aprovado';
      case 'rejected': return 'Rejeitado';
      case 'booked': return 'Reservado';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'booked': return <Calendar className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

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

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="bg-white shadow-lg rounded-3xl overflow-hidden mb-12 border-2 border-yellow-400/20">
          <div className="bg-black px-12 py-16 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
              DASHBOARD RAIO DOS CACHOPOS
            </h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-yellow-200 font-light">
              Gerir contratações, enviar propostas e acompanhar o negócio
            </p>
          </div>

          {/* Stats Cards - Enhanced with more details */}
          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="text-3xl font-black text-yellow-600 mb-2">{getStatusCount('pending')}</div>
                <div className="text-yellow-700 font-semibold text-sm tracking-wide">PENDENTES</div>
                <div className="text-yellow-600 text-xs mt-1">Aguardam decisão</div>
              </div>
              
              <div className="bg-blue-50 border-2 border-blue-400 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-black text-blue-600 mb-2">{getStatusCount('approved')}</div>
                <div className="text-blue-700 font-semibold text-sm tracking-wide">APROVADOS</div>
                <div className="text-blue-600 text-xs mt-1">Prontos para proposta</div>
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-black text-green-600 mb-2">{getStatusCount('booked')}</div>
                <div className="text-green-700 font-semibold text-sm tracking-wide">RESERVADOS</div>
                <div className="text-green-600 text-xs mt-1">Datas confirmadas</div>
              </div>

              <div className="bg-gray-50 border-2 border-gray-300 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <User className="h-8 w-8 text-gray-600" />
                </div>
                <div className="text-3xl font-black text-gray-800 mb-2">{bookings.length}</div>
                <div className="text-gray-700 font-semibold text-sm tracking-wide">TOTAL</div>
                <div className="text-gray-600 text-xs mt-1">Todos os pedidos</div>
              </div>
            </div>

            {/* External Links Section - Only Excel */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-black mb-6 text-center">Gestão Externa</h3>
              <div className="flex justify-center">
                <a
                  href="https://docs.google.com/spreadsheets/d/1uXv1O5tG-Q0x50c_nlOz5tKyaFzmFdA5t_SGAS-u130/edit?gid=1331773265#gid=1331773265"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 px-6 py-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FileSpreadsheet className="h-5 w-5" />
                  <span className="font-semibold">Excel das Datas</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Actions and Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 mb-8">
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-amber-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border-2 border-amber-200 rounded-xl text-black focus:border-yellow-400 focus:outline-none"
                >
                  <option value="all">Todas as Contratações</option>
                  <option value="pending">Pendentes</option>
                  <option value="approved">Aprovados</option>
                  <option value="rejected">Rejeitados</option>
                  <option value="booked">Reservados</option>
                </select>
              </div>

              <button
                onClick={() => setShowManualBookingForm(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="h-5 w-5" />
                <span>Adicionar Reserva</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white shadow-lg rounded-3xl overflow-hidden border-2 border-yellow-400/20">
          <div className="p-12">
            <h3 className="text-3xl font-black text-black mb-8 tracking-tight">Agenda Cachopa</h3>
            
            {filteredBookings.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">📋</div>
                <p className="text-2xl font-bold text-black mb-2">Nenhuma contratação encontrada</p>
                <p className="text-amber-600">As contratações aparecerão aqui quando chegarem</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredBookings.map(booking => (
                  <div key={booking.id} className="border-2 border-amber-100 rounded-2xl p-8 hover:border-yellow-400 transition-all duration-300">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h4 className="text-2xl font-bold text-black">{booking.clientName}</h4>
                          <span className={`px-4 py-2 text-sm font-semibold rounded-full border-2 flex items-center space-x-2 ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span>{getStatusText(booking.status)}</span>
                          </span>
                        </div>
                        <p className="text-amber-600 font-medium">
                          Submetido em {new Date(booking.createdAt).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setSelectedBooking(selectedBooking?.id === booking.id ? null : booking)}
                          className="p-3 border-2 border-amber-200 rounded-xl text-amber-600 hover:bg-amber-50 transition-all duration-300"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        {booking.status === 'booked' && (
                          <button
                            onClick={() => handleEditBooking(booking)}
                            className="p-3 border-2 border-amber-200 rounded-xl text-amber-600 hover:bg-amber-50 transition-all duration-300"
                            title="Editar reserva"
                          >
                            <Settings className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteBooking(booking.id, booking.clientName)}
                          className="p-3 border-2 border-red-200 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300"
                          title="Apagar reserva"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      <div className="flex items-center space-x-3 text-amber-700">
                        <Calendar className="h-5 w-5" />
                        <span className="font-medium">{new Date(booking.eventDate).toLocaleDateString('pt-PT')}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-amber-700">
                        <MapPin className="h-5 w-5" />
                        <span className="font-medium">{booking.venue}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-amber-700">
                        <Banknote className="h-5 w-5" />
                        <span className="font-medium">€{booking.budget}</span>
                      </div>
                    </div>

                    {/* Quick Actions for Pending Bookings */}
                    {booking.status === 'pending' && (
                      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                        <div className="flex items-center space-x-2 text-yellow-700 font-medium">
                          <AlertCircle className="h-5 w-5" />
                          <span>Ação necessária:</span>
                        </div>
                        <button
                          onClick={() => handleApproveBooking(booking)}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 text-sm"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>Aceitar</span>
                        </button>
                        <button
                          onClick={() => handleRejectBooking(booking)}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-300 text-sm"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span>Recusar</span>
                        </button>
                      </div>
                    )}

                    {selectedBooking?.id === booking.id && (
                      <div className="mt-8 pt-8 border-t-2 border-amber-100">
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                          <div className="space-y-4">
                            <h5 className="text-xl font-bold text-black">Informações de Contacto</h5>
                            <div className="space-y-3 text-amber-700">
                              <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5" />
                                <span className="font-medium">{booking.clientEmail}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5" />
                                <span className="font-medium">{booking.clientPhone}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <h5 className="text-xl font-bold text-black">Detalhes do Evento</h5>
                            <div className="space-y-3 text-amber-700">
                              <p><strong>Tipo:</strong> {booking.eventType}</p>
                              <p><strong>Duração:</strong> {booking.duration} minutos</p>
                            </div>
                          </div>
                        </div>

                        {booking.message && (
                          <div className="mb-8">
                            <h5 className="text-xl font-bold text-black mb-3">Detalhes Adicionais</h5>
                            <p className="text-amber-700 bg-amber-50 p-6 rounded-2xl border-2 border-amber-100">
                              {booking.message}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-4">
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproveBooking(booking)}
                                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300"
                              >
                                <CheckCircle className="h-5 w-5" />
                                <span>Aceitar</span>
                              </button>
                              <button
                                onClick={() => handleRejectBooking(booking)}
                                className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-300"
                              >
                                <XCircle className="h-5 w-5" />
                                <span>Recusar</span>
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteBooking(booking.id, booking.clientName)}
                            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-300"
                          >
                            <Trash2 className="h-5 w-5" />
                            <span>Apagar Reserva</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Edit Booking Modal */}
        {showEditForm && selectedBooking && (
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
                    onClick={saveEditedBooking}
                    className="flex-1 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300"
                  >
                    Guardar Alterações
                  </button>
                  <button
                    onClick={() => {
                      setShowEditForm(false);
                      setSelectedBooking(null);
                    }}
                    className="flex-1 px-6 py-3 border-2 border-amber-200 text-amber-700 font-semibold rounded-full hover:bg-amber-50 transition-all duration-300"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manual Booking Modal */}
        {showManualBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-yellow-400/20">
              <div className="bg-black px-8 py-8 text-center">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <Upload className="h-8 w-8 text-white" />
                  <h3 className="text-3xl font-black text-white tracking-tight">Adicionar Reserva Manual</h3>
                </div>
                <p className="text-yellow-200">Adicione datas já reservadas do seu Excel ou agenda</p>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">NOME DO CLIENTE *</label>
                    <input
                      type="text"
                      value={manualBookingData.clientName}
                      onChange={(e) => setManualBookingData(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      placeholder="Nome completo do cliente"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">EMAIL</label>
                    <input
                      type="email"
                      value={manualBookingData.clientEmail}
                      onChange={(e) => setManualBookingData(prev => ({ ...prev, clientEmail: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">TELEFONE</label>
                    <input
                      type="tel"
                      value={manualBookingData.clientPhone}
                      onChange={(e) => setManualBookingData(prev => ({ ...prev, clientPhone: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      placeholder="912 345 678"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">DATA DO EVENTO *</label>
                    <input
                      type="date"
                      value={manualBookingData.eventDate}
                      onChange={(e) => setManualBookingData(prev => ({ ...prev, eventDate: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">TIPO DE EVENTO *</label>
                    <select
                      value={manualBookingData.eventType}
                      onChange={(e) => setManualBookingData(prev => ({ ...prev, eventType: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="">Selecione o tipo de evento</option>
                      {eventTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">LOCAL</label>
                    <input
                      type="text"
                      value={manualBookingData.venue}
                      onChange={(e) => setManualBookingData(prev => ({ ...prev, venue: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      placeholder="Nome do local ou morada"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">DURAÇÃO</label>
                    <select
                      value={manualBookingData.duration}
                      onChange={(e) => setManualBookingData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                    >
                      {durationOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-black font-semibold text-sm tracking-wide">ORÇAMENTO (€)</label>
                    <input
                      type="text"
                      value={manualBookingData.budget}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, '').slice(0, 5);
                        setManualBookingData(prev => ({ ...prev, budget: numericValue }));
                      }}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      placeholder="1500"
                      maxLength={5}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-black font-semibold text-sm tracking-wide">NOTAS ADICIONAIS</label>
                  <textarea
                    value={manualBookingData.message}
                    onChange={(e) => setManualBookingData(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-400 focus:outline-none resize-none"
                    placeholder="Detalhes adicionais sobre a reserva..."
                  />
                </div>
                
                <div className="flex space-x-4 pt-6">
                  <button
                    onClick={addManualBooking}
                    disabled={!manualBookingData.clientName || !manualBookingData.eventDate || !manualBookingData.eventType}
                    className="flex-1 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Adicionar Reserva
                  </button>
                  <button
                    onClick={() => {
                      setShowManualBookingForm(false);
                      setManualBookingData({
                        clientName: '',
                        clientEmail: '',
                        clientPhone: '',
                        eventDate: '',
                        eventType: '',
                        venue: '',
                        duration: 60,
                        budget: '',
                        message: ''
                      });
                    }}
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

export default AdminDashboard;