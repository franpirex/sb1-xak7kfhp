import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKINGS_KEY = 'band_bookings';
const PROPOSALS_KEY = 'band_proposals';

// Pre-existing bookings that are already confirmed
const PRE_EXISTING_BOOKINGS = [
  {
    id: 'pre-1',
    clientName: 'Festa aniversário d\'Os Lagoias',
    clientEmail: 'contato@oslagoias.pt',
    clientPhone: '912 345 678',
    eventDate: '2025-07-12',
    eventType: 'Festa de Aniversário',
    venue: 'Portalegre',
    duration: 90,
    guests: 100,
    budget: '2500',
    message: 'Festa de aniversário especial',
    status: 'booked',
    proposalSent: true,
    proposalAmount: 2500,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'pre-2',
    clientName: 'Festas em Honra de Nª Srª da Alegria',
    clientEmail: 'festas@alegrete.pt',
    clientPhone: '913 456 789',
    eventDate: '2025-08-14',
    eventType: 'Festival',
    venue: 'Alegrete',
    duration: 60,
    guests: 500,
    budget: '3000',
    message: 'Festas tradicionais de Alegrete',
    status: 'booked',
    proposalSent: true,
    proposalAmount: 3000,
    createdAt: '2024-01-02T00:00:00.000Z'
  },
  {
    id: 'pre-3',
    clientName: 'Evento Casa Branca',
    clientEmail: 'eventos@casabranca.pt',
    clientPhone: '914 567 890',
    eventDate: '2025-08-15',
    eventType: 'Celebração Familiar',
    venue: 'Casa Branca (Sousel)',
    duration: 60,
    guests: 80,
    budget: '2000',
    message: 'Celebração especial em Casa Branca',
    status: 'booked',
    proposalSent: true,
    proposalAmount: 2000,
    createdAt: '2024-01-03T00:00:00.000Z'
  },
  {
    id: 'pre-4',
    clientName: 'Carolina Pinheiro',
    clientEmail: 'carolina.pinheiro@email.com',
    clientPhone: '915 678 901',
    eventDate: '2025-08-16',
    eventType: 'Casamento',
    venue: 'Ervedal Avis',
    duration: 90,
    guests: 120,
    budget: '3500',
    message: 'Casamento da Carolina - evento muito especial',
    status: 'booked',
    proposalSent: true,
    proposalAmount: 3500,
    createdAt: '2024-01-04T00:00:00.000Z'
  }
];

export const storageUtils = {
  getBookings: async () => {
    try {
      const stored = await AsyncStorage.getItem(BOOKINGS_KEY);
      const userBookings = stored ? JSON.parse(stored) : [];
      
      // Combine pre-existing bookings with user bookings
      const allBookings = [...PRE_EXISTING_BOOKINGS, ...userBookings];
      
      // Remove duplicates based on ID
      const uniqueBookings = allBookings.filter((booking, index, self) => 
        index === self.findIndex(b => b.id === booking.id)
      );
      
      return uniqueBookings;
    } catch (error) {
      console.error('Error getting bookings:', error);
      return PRE_EXISTING_BOOKINGS;
    }
  },

  saveBookings: async (bookings) => {
    try {
      // Only save user-created bookings (exclude pre-existing ones)
      const userBookings = bookings.filter(booking => 
        !PRE_EXISTING_BOOKINGS.some(preBooking => preBooking.id === booking.id)
      );
      await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(userBookings));
    } catch (error) {
      console.error('Error saving bookings:', error);
    }
  },

  addBooking: async (booking) => {
    try {
      const stored = await AsyncStorage.getItem(BOOKINGS_KEY);
      const userBookings = stored ? JSON.parse(stored) : [];
      userBookings.push(booking);
      await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(userBookings));
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  },

  updateBooking: async (id, updates) => {
    try {
      // Check if it's a pre-existing booking
      const isPreExisting = PRE_EXISTING_BOOKINGS.some(booking => booking.id === id);
      
      if (isPreExisting) {
        // For pre-existing bookings, we need to handle updates differently
        // We'll create a copy in user storage with the updates
        const originalBooking = PRE_EXISTING_BOOKINGS.find(b => b.id === id);
        if (originalBooking) {
          const stored = await AsyncStorage.getItem(BOOKINGS_KEY);
          const userBookings = stored ? JSON.parse(stored) : [];
          const existingUserBooking = userBookings.find(b => b.id === id);
          
          if (existingUserBooking) {
            // Update existing user booking
            Object.assign(existingUserBooking, updates);
          } else {
            // Create new user booking with updates
            const updatedBooking = { ...originalBooking, ...updates };
            userBookings.push(updatedBooking);
          }
          
          await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(userBookings));
        }
      } else {
        // Regular user booking update
        const stored = await AsyncStorage.getItem(BOOKINGS_KEY);
        const userBookings = stored ? JSON.parse(stored) : [];
        const index = userBookings.findIndex(b => b.id === id);
        if (index !== -1) {
          userBookings[index] = { ...userBookings[index], ...updates };
          await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(userBookings));
        }
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  },

  deleteBooking: async (id) => {
    try {
      const allBookings = await storageUtils.getBookings();
      const updatedBookings = allBookings.filter(booking => booking.id !== id);
      await storageUtils.saveBookings(updatedBookings);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  },

  getProposals: async () => {
    try {
      const stored = await AsyncStorage.getItem(PROPOSALS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting proposals:', error);
      return [];
    }
  },

  saveProposals: async (proposals) => {
    try {
      await AsyncStorage.setItem(PROPOSALS_KEY, JSON.stringify(proposals));
    } catch (error) {
      console.error('Error saving proposals:', error);
    }
  },

  addProposal: async (proposal) => {
    try {
      const proposals = await storageUtils.getProposals();
      proposals.push(proposal);
      await storageUtils.saveProposals(proposals);
    } catch (error) {
      console.error('Error adding proposal:', error);
    }
  },

  isDateBooked: async (date) => {
    try {
      const bookings = await storageUtils.getBookings();
      return bookings.some(booking => 
        booking.eventDate === date && booking.status === 'booked'
      );
    } catch (error) {
      console.error('Error checking if date is booked:', error);
      return false;
    }
  },

  getBookingsForDate: async (date) => {
    try {
      const bookings = await storageUtils.getBookings();
      return bookings.filter(booking => booking.eventDate === date);
    } catch (error) {
      console.error('Error getting bookings for date:', error);
      return [];
    }
  }
};