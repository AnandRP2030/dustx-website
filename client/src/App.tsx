import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
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
    <div className="bg-neutral-950 text-gray-100 min-h-screen font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      {/* Persistent Glassmorphic Header */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main>
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Precision Services Section */}
        <Services onOpenBooking={(service) => handleOpenBooking(service)} />

        {/* 4. Interactive Transformation Before & After Slider */}
        <BeforeAfterSlider onOpenBooking={(treatment) => handleOpenBooking(treatment)} />

        {/* 5. Transparent Packages & Pricing */}
        <Pricing onSelectPackage={(pkg) => handleOpenBooking(pkg)} />

        {/* 6. Verified Customer Testimonials */}
        <Testimonials />

        {/* 7. Interactive FAQ Accordion */}
        <FAQ />
      </main>

      {/* 8. Studio HQ & Inquiry Footer */}
      <ContactFooter />

      {/* 9. Floating WhatsApp Quick-Chat */}
      <WhatsAppButton />

      {/* 10. Global Multi-Step Booking Wizard Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialPackage={selectedBookingPackage}
      />
    </div>
  );
}

export default App;