import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { storageUtils } from '../utils/storage';

const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const allBookings = await storageUtils.getBookings();
      setBookings(allBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getBookingStatus = (dateString) => {
    const dayBookings = bookings.filter(booking => booking.eventDate === dateString);
    if (dayBookings.length === 0) return null;
    
    const hasBooked = dayBookings.some(b => b.status === 'booked');
    if (hasBooked) return 'booked';
    
    return null;
  };

  const navigateMonth = (direction) => {
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

  const handleDatePress = (dateString) => {
    const dayBookings = bookings.filter(booking => booking.eventDate === dateString);
    if (dayBookings.length > 0) {
      setSelectedDate({ date: dateString, bookings: dayBookings });
      setShowModal(true);
    }
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
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(year, month, day);
      const status = getBookingStatus(dateString);
      const isToday = dateString === todayString;

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            isToday && styles.todayCell,
            status === 'booked' && styles.bookedCell
          ]}
          onPress={() => handleDatePress(dateString)}
        >
          <Text style={[
            styles.dayText,
            isToday && styles.todayText,
            status === 'booked' && styles.bookedText
          ]}>
            {day}
          </Text>
          {status === 'booked' && (
            <View style={styles.bookedIndicator}>
              <Text style={styles.bookedIndicatorText}>●</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return days;
  };

  const renderBookingModal = () => (
    <Modal
      visible={showModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>
            {selectedDate && new Date(selectedDate.date).toLocaleDateString('pt-PT', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {selectedDate?.bookings.map(booking => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <Text style={styles.bookingName}>{booking.clientName}</Text>
                <View style={[styles.statusBadge, { backgroundColor: '#10B981' }]}>
                  <Text style={styles.statusText}>Reservado</Text>
                </View>
              </View>
              
              <View style={styles.bookingDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="musical-notes" size={16} color="#D97706" />
                  <Text style={styles.detailText}>{booking.eventType}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#D97706" />
                  <Text style={styles.detailText}>{booking.venue}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time" size={16} color="#D97706" />
                  <Text style={styles.detailText}>{booking.duration} minutos</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="mail" size={16} color="#D97706" />
                  <Text style={styles.detailText}>{booking.clientEmail}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="call" size={16} color="#D97706" />
                  <Text style={styles.detailText}>{booking.clientPhone}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="cash" size={16} color="#D97706" />
                  <Text style={styles.detailText}>€{booking.budget}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FEF3C7', '#FFFFFF']}
        style={styles.gradient}
      >
        {/* Calendar Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={() => navigateMonth('prev')}
            style={styles.navButton}
          >
            <Ionicons name="chevron-back" size={24} color="#D97706" />
          </TouchableOpacity>
          
          <Text style={styles.monthTitle}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          
          <TouchableOpacity
            onPress={() => navigateMonth('next')}
            style={styles.navButton}
          >
            <Ionicons name="chevron-forward" size={24} color="#D97706" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.calendarContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Day headers */}
          <View style={styles.dayHeaders}>
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <View key={day} style={styles.dayHeader}>
                <Text style={styles.dayHeaderText}>{day}</Text>
              </View>
            ))}
          </View>
          
          {/* Calendar grid */}
          <View style={styles.calendarGrid}>
            {renderCalendarDays()}
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendText}>Reservado</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FCD34D' }]} />
              <Text style={styles.legendText}>Hoje</Text>
            </View>
          </View>
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
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  navButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
  },
  calendarContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dayHeaders: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    marginBottom: 8,
  },
  dayHeader: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dayHeaderText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  emptyDay: {
    width: '14.28%',
    height: 60,
  },
  dayCell: {
    width: '14.28%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 2,
  },
  todayCell: {
    backgroundColor: '#FCD34D',
  },
  bookedCell: {
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  todayText: {
    color: '#000000',
    fontWeight: '900',
  },
  bookedText: {
    color: '#065F46',
    fontWeight: '700',
  },
  bookedIndicator: {
    position: 'absolute',
    bottom: 4,
  },
  bookedIndicatorText: {
    fontSize: 8,
    color: '#10B981',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  bookingCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FCD34D',
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
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#D97706',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default CalendarScreen;