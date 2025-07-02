import { Booking, Proposal } from '../types/booking';

const BOOKINGS_KEY = 'band_bookings';
const PROPOSALS_KEY = 'band_proposals';

// Pre-existing bookings that are already confirmed
const PRE_EXISTING_BOOKINGS: Booking[] = [
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
  getBookings: (): Booking[] => {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    const userBookings = stored ? JSON.parse(stored) : [];
    
    // Combine pre-existing bookings with user bookings
    const allBookings = [...PRE_EXISTING_BOOKINGS, ...userBookings];
    
    // Remove duplicates based on ID
    const uniqueBookings = allBookings.filter((booking, index, self) => 
      index === self.findIndex(b => b.id === booking.id)
    );
    
    return uniqueBookings;
  },

  saveBookings: (bookings: Booking[]): void => {
    // Only save user-created bookings (exclude pre-existing ones)
    const userBookings = bookings.filter(booking => 
      !PRE_EXISTING_BOOKINGS.some(preBooking => preBooking.id === booking.id)
    );
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(userBookings));
  },

  addBooking: (booking: Booking): void => {
    const userBookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
    userBookings.push(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(userBookings));
  },

  updateBooking: (id: string, updates: Partial<Booking>): void => {
    // Check if it's a pre-existing booking
    const isPreExisting = PRE_EXISTING_BOOKINGS.some(booking => booking.id === id);
    
    if (isPreExisting) {
      // For pre-existing bookings, we need to handle updates differently
      // We'll create a copy in user storage with the updates
      const originalBooking = PRE_EXISTING_BOOKINGS.find(b => b.id === id);
      if (originalBooking) {
        const userBookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
        const existingUserBooking = userBookings.find((b: Booking) => b.id === id);
        
        if (existingUserBooking) {
          // Update existing user booking
          Object.assign(existingUserBooking, updates);
        } else {
          // Create new user booking with updates
          const updatedBooking = { ...originalBooking, ...updates };
          userBookings.push(updatedBooking);
        }
        
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(userBookings));
      }
    } else {
      // Regular user booking update
      const userBookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
      const index = userBookings.findIndex((b: Booking) => b.id === id);
      if (index !== -1) {
        userBookings[index] = { ...userBookings[index], ...updates };
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(userBookings));
      }
    }
  },

  getProposals: (): Proposal[] => {
    const stored = localStorage.getItem(PROPOSALS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveProposals: (proposals: Proposal[]): void => {
    localStorage.setItem(PROPOSALS_KEY, JSON.stringify(proposals));
  },

  addProposal: (proposal: Proposal): void => {
    const proposals = storageUtils.getProposals();
    proposals.push(proposal);
    storageUtils.saveProposals(proposals);
  },

  isDateBooked: (date: string): boolean => {
    const bookings = storageUtils.getBookings();
    return bookings.some(booking => 
      booking.eventDate === date && booking.status === 'booked'
    );
  },

  getBookingsForDate: (date: string): Booking[] => {
    const bookings = storageUtils.getBookings();
    return bookings.filter(booking => booking.eventDate === date);
  }
};