import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
  Modal,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { storageUtils } from '../utils/storage';

const DashboardScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const allBookings = await storageUtils.getBookings();
      const sortedBookings = allBookings.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setBookings(sortedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await storageUtils.updateBooking(id, { status });
      await loadBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleApproveBooking = (booking) => {
    Alert.alert(
      'Aceitar Pedido',
      `Confirma que deseja aceitar o pedido de ${booking.clientName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Aceitar', 
          onPress: () => updateBookingStatus(booking.id, 'booked')
        }
      ]
    );
  };

  const handleRejectBooking = (booking) => {
    Alert.alert(
      'Recusar Pedido',
      `Confirma que deseja recusar o pedido de ${booking.clientName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Recusar', 
          style: 'destructive',
          onPress: () => updateBookingStatus(booking.id, 'rejected')
        }
      ]
    );
  };

  const handleDeleteBooking = (booking) => {
    Alert.alert(
      'Apagar Reserva',
      `Tem certeza que deseja apagar definitivamente a reserva de ${booking.clientName}?\n\nEsta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Apagar', 
          style: 'destructive',
          onPress: async () => {
            try {
              await storageUtils.deleteBooking(booking.id);
              await loadBookings();
            } catch (error) {
              console.error('Error deleting booking:', error);
            }
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'approved': return '#3B82F6';
      case 'rejected': return '#EF4444';
      case 'booked': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'approved': return 'Aprovado';
      case 'rejected': return 'Rejeitado';
      case 'booked': return 'Reservado';
      default: return status;
    }
  };

  const getStatusCount = (status) => {
    return bookings.filter(b => b.status === status).length;
  };

  const filteredBookings = bookings.filter(booking => 
    filterStatus === 'all' || booking.status === filterStatus
  );

  const renderBookingCard = (booking) => (
    <TouchableOpacity
      key={booking.id}
      style={styles.bookingCard}
      onPress={() => {
        setSelectedBooking(booking);
        setShowModal(true);
      }}
    >
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingName}>{booking.clientName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
          <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
        </View>
      </View>
      
      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color="#D97706" />
          <Text style={styles.detailText}>
            {new Date(booking.eventDate).toLocaleDateString('pt-PT')}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location" size={16} color="#D97706" />
          <Text style={styles.detailText}>{booking.venue}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash" size={16} color="#D97706" />
          <Text style={styles.detailText}>€{booking.budget}</Text>
        </View>
      </View>

      {booking.status === 'pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.approveButton]}
            onPress={() => handleApproveBooking(booking)}
          >
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Aceitar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleRejectBooking(booking)}
          >
            <Ionicons name="close" size={16} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Recusar</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderBookingModal = () => (
    <Modal
      visible={showModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Detalhes da Reserva</Text>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {selectedBooking && (
          <ScrollView style={styles.modalContent}>
            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Cliente</Text>
              <Text style={styles.sectionText}>{selectedBooking.clientName}</Text>
              <Text style={styles.sectionSubtext}>{selectedBooking.clientEmail}</Text>
              <Text style={styles.sectionSubtext}>{selectedBooking.clientPhone}</Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Evento</Text>
              <Text style={styles.sectionText}>{selectedBooking.eventType}</Text>
              <Text style={styles.sectionSubtext}>
                {new Date(selectedBooking.eventDate).toLocaleDateString('pt-PT')}
              </Text>
              <Text style={styles.sectionSubtext}>{selectedBooking.venue}</Text>
              <Text style={styles.sectionSubtext}>{selectedBooking.duration} minutos</Text>
              <Text style={styles.sectionSubtext}>€{selectedBooking.budget}</Text>
            </View>

            {selectedBooking.message && (
              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Mensagem</Text>
                <Text style={styles.sectionText}>{selectedBooking.message}</Text>
              </View>
            )}

            <View style={styles.modalActions}>
              {selectedBooking.status === 'pending' && (
                <>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.approveButton]}
                    onPress={() => {
                      handleApproveBooking(selectedBooking);
                      setShowModal(false);
                    }}
                  >
                    <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                    <Text style={styles.modalButtonText}>Aceitar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.rejectButton]}
                    onPress={() => {
                      handleRejectBooking(selectedBooking);
                      setShowModal(false);
                    }}
                  >
                    <Ionicons name="close" size={20} color="#FFFFFF" />
                    <Text style={styles.modalButtonText}>Recusar</Text>
                  </TouchableOpacity>
                </>
              )}
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={() => {
                  setShowModal(false);
                  handleDeleteBooking(selectedBooking);
                }}
              >
                <Ionicons name="trash" size={20} color="#FFFFFF" />
                <Text style={styles.modalButtonText}>Apagar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FEF3C7', '#FFFFFF']}
        style={styles.gradient}
      >
        {/* Header Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{getStatusCount('pending')}</Text>
            <Text style={styles.statLabel}>Pendentes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{getStatusCount('booked')}</Text>
            <Text style={styles.statLabel}>Reservados</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{bookings.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {/* Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {[
            { key: 'all', label: 'Todos' },
            { key: 'pending', label: 'Pendentes' },
            { key: 'booked', label: 'Reservados' },
            { key: 'rejected', label: 'Rejeitados' }
          ].map(filter => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                filterStatus === filter.key && styles.filterButtonActive
              ]}
              onPress={() => setFilterStatus(filter.key)}
            >
              <Text style={[
                styles.filterButtonText,
                filterStatus === filter.key && styles.filterButtonTextActive
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bookings List */}
        <ScrollView
          style={styles.bookingsList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredBookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>Nenhuma contratação encontrada</Text>
            </View>
          ) : (
            filteredBookings.map(renderBookingCard)
          )}
        </ScrollView>

        {renderBookingModal()}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#FCD34D',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: '#F59E0B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D97706',
    textAlign: 'center',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  filterButtonActive: {
    backgroundColor: '#FCD34D',
    borderColor: '#F59E0B',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D97706',
  },
  filterButtonTextActive: {
    color: '#000000',
  },
  bookingsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bookingDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#D97706',
    marginLeft: 8,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  approveButton: {
    backgroundColor: '#10B981',
  },
  rejectButton: {
    backgroundColor: '#EF4444',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FDE68A',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 4,
  },
  sectionSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  modalActions: {
    gap: 12,
    paddingTop: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default DashboardScreen;