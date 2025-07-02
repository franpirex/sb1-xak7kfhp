export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventDate: string;
  eventType: string;
  venue: string;
  duration: number;
  guests: number;
  budget: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'booked';
  proposalSent: boolean;
  proposalAmount?: number;
  createdAt: string;
}

export interface Proposal {
  id: string;
  bookingId: string;
  amount: number;
  description: string;
  terms: string;
  validUntil: string; // Kept for compatibility but not used
  status: 'sent' | 'accepted' | 'rejected';
  createdAt: string;
}

export type ViewMode = 'client' | 'admin';