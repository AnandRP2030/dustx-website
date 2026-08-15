import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import Pricing from './components/Pricing';
import ContactFooter from './components/ContactFooter';
import WhatsAppButton from './components/WhatsAppButton';
import BookingModal from './components/BookingModal';
import './App.css';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingPackage, setSelectedBookingPackage] = useState<string | undefined>();

  const handleOpenBooking = (packageName?: string) => {
    setSelectedBookingPackage(packageName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="bg-neutral-900 text-gray-100 min-h-screen font-sans overflow-x-hidden">
      <Navbar onOpenBooking={() => handleOpenBooking()} />
      <Hero onOpenBooking={() => handleOpenBooking()} />
      <Services />
      <BeforeAfterSlider onOpenBooking={(pkg) => handleOpenBooking(pkg)} />
      <Pricing onSelectPackage={(pkg) => handleOpenBooking(pkg)} />
      <ContactFooter />
      <WhatsAppButton />

      {/* Global Interactive Booking Wizard Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialPackage={selectedBookingPackage}
      />
    </div>
  );
}

export default App;