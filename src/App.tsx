import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import BookingForm from './components/BookingForm';
import Calendar from './components/Calendar';
import BookingSuccess from './components/BookingSuccess';
import AdminLogin from './components/AdminLogin';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  const handleBookingSubmit = () => {
    setShowBookingSuccess(true);
  };

  const handleBookNow = () => {
    setActiveSection('booking');
    setShowBookingSuccess(false);
  };

  const handleBackToHome = () => {
    setActiveSection('home');
    setShowBookingSuccess(false);
  };

  const handleViewCalendar = () => {
    setActiveSection('calendar');
    setShowBookingSuccess(false);
  };

  // Simplified admin detection
  const isAdminSite = () => {
    const hostname = window.location.hostname;
    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    
    // Check for admin subdomain
    if (hostname.startsWith('admin.')) {
      return true;
    }
    
    // Check for admin parameter
    if (searchParams.get('admin') === 'true') {
      return true;
    }
    
    // Check for admin hash
    if (hash === '#admin') {
      return true;
    }
    
    return false;
  };

  if (isAdminSite()) {
    return <AdminLogin />;
  }

  if (showBookingSuccess) {
    return (
      <>
        <Header 
          viewMode="client"
          onViewModeChange={() => {}}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <BookingSuccess 
          onBackToHome={handleBackToHome}
          onViewCalendar={handleViewCalendar}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        viewMode="client"
        onViewModeChange={() => {}}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      {activeSection === 'home' && <HomePage onBookNow={handleBookNow} />}
      {activeSection === 'booking' && <BookingForm onSubmit={handleBookingSubmit} />}
      {activeSection === 'calendar' && <Calendar viewMode="client" />}
    </div>
  );
}

export default App;