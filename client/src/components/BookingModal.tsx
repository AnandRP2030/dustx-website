import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaWhatsapp,
  FaArrowRight,
  FaArrowLeft,
  FaCheckCircle,
  FaBuilding,
  FaTruck
} from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import {
  VEHICLE_TYPES,
  SERVICES,
  MONTHLY_PACKAGES,
  type VehicleTypeId,
  findPackageByName,
  getPackagePrice,
  isMonthlyPackage,
} from '../data/packagesData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
}

const TIME_SLOTS = [
  'Early Morning (6:00 AM - 09:00 AM)',
  'Morning (9:00 AM - 12:00 PM)',
  'Afternoon (1:00 PM - 4:00 PM)',
  'Evening (4:00 PM - 6:00 PM)',
  'Night (7:00 PM - 10:00 PM)',
];

function BookingModal({ isOpen, onClose, initialPackage }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [vehicleTypeId, setVehicleTypeId] = useState<VehicleTypeId>('hatchback');

  const [selectedPackage, setSelectedPackage] = useState<string>(() => {
    const match = findPackageByName(initialPackage);
    if (match) {
      return match.type === 'service' ? match.title : match.name;
    }
    return initialPackage || 'Standard Wash';
  });

  const [prevInitialPackage, setPrevInitialPackage] = useState(initialPackage);
  if (initialPackage !== prevInitialPackage) {
    setPrevInitialPackage(initialPackage);
    const match = findPackageByName(initialPackage);
    if (match) {
      setSelectedPackage(match.type === 'service' ? match.title : match.name);
    } else if (initialPackage) {
      setSelectedPackage(initialPackage);
    }
    // Set vehicle type to hatchback by default as requested
    setVehicleTypeId('hatchback');
  }

  const [serviceMode, setServiceMode] = useState<'Pickup & Drop' | 'Doorstep Service'>('Doorstep Service');

  // Default date: tomorrow formatted YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [serviceDate, setServiceDate] = useState(minDateStr);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Calculate active objects and estimated price
  const activeVehicleObj = VEHICLE_TYPES.find(v => v.id === vehicleTypeId) || VEHICLE_TYPES[0];
  const matchedPkg = findPackageByName(selectedPackage) || SERVICES[0];
  const isMonthly = isMonthlyPackage(matchedPkg);
  const estimatedPrice = getPackagePrice(matchedPkg, vehicleTypeId);
  const priceDisplay = `₹ ${estimatedPrice.toLocaleString('en-IN')}${isMonthly ? ' / month' : ''}`;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(prev => prev + 1);
    } else if (step === 3) {
      handleSubmitBooking();
    }
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Generate reference ID e.g. DX-8429
    const generatedRef = `DX-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(generatedRef);

    const formData = new FormData();
    formData.append('_subject', `[New DustX Booking] ${selectedPackage} (${isMonthly ? 'Monthly' : 'Single'}) - ${customerName} (${generatedRef})`);
    formData.append('Booking Reference', generatedRef);
    formData.append('Customer Name', customerName);
    formData.append('Phone', customerPhone);
    formData.append('Email', customerEmail);
    formData.append('Vehicle Type', activeVehicleObj.name);
    formData.append('Package Type', isMonthly ? 'Monthly Maintenance Package' : 'Single Detailing Service');
    formData.append('Service Package', selectedPackage);
    formData.append('Estimated Price', priceDisplay);
    formData.append('Service Mode', serviceMode);
    formData.append('Scheduled Date', serviceDate);
    formData.append('Time Slot', timeSlot);
    if (customerAddress) formData.append('Address / Locality', customerAddress);
    if (notes) formData.append('Special Notes', notes);

    try {
      const response = await fetch('https://formspree.io/f/xppzngny', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setStep(4); // Success step
      } else {
        setSubmitError('Failed to submit booking. Please try again or book directly via WhatsApp.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection or use WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppVerifyUrl = () => {
    const text = `*DustX Booking Verification*%0A%0A*Reference:* ${bookingRef}%0A*Name:* ${customerName}%0A*Phone:* ${customerPhone}%0A*Vehicle:* ${activeVehicleObj.name}%0A*Package:* ${selectedPackage} (${isMonthly ? 'Monthly Plan' : 'Single Service'})%0A*Est. Total:* ${priceDisplay}%0A*Mode:* ${serviceMode}%0A*Date:* ${serviceDate}%0A*Time:* ${timeSlot}${customerAddress ? `%0A*Location:* ${customerAddress}` : ''}`;
    return `https://wa.me/7012947094?text=${text}`;
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSubmitError(null);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">

        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl z-50 overflow-hidden my-8"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-yellow-400/10 blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-yellow-500/10 blur-[100px] pointer-events-none rounded-full" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-5 border-b border-neutral-800 relative z-10">
            <div>
              <span className="text-yellow-400 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                <IoSparkles className="text-sm" /> Precision Appointment
              </span>
              <h2 className="text-2xl font-black tracking-tight text-white mt-0.5">
                Book Your <span className="text-yellow-400">DustX Service</span>
              </h2>
            </div>
            <button
              onClick={resetAndClose}
              className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-gray-400 hover:text-white hover:border-yellow-400 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Multi-Step Progress Tracker */}
          {step < 4 && (
            <div className="py-4 border-b border-neutral-800/80 mb-6 flex items-center justify-between text-xs font-semibold text-gray-400 relative z-10">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-yellow-400' : ''}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${step >= 1 ? 'bg-yellow-400 text-black border-yellow-400' : 'border-neutral-700'}`}>1</span>
                <span className="hidden sm:inline">Vehicle & Service</span>
              </div>
              <div className={`h-[1px] flex-1 mx-3 ${step >= 2 ? 'bg-yellow-400/60' : 'bg-neutral-800'}`} />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-yellow-400' : ''}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${step >= 2 ? 'bg-yellow-400 text-black border-yellow-400' : 'border-neutral-700'}`}>2</span>
                <span className="hidden sm:inline">Schedule & Mode</span>
              </div>
              <div className={`h-[1px] flex-1 mx-3 ${step >= 3 ? 'bg-yellow-400/60' : 'bg-neutral-800'}`} />
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-yellow-400' : ''}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${step >= 3 ? 'bg-yellow-400 text-black border-yellow-400' : 'border-neutral-700'}`}>3</span>
                <span className="hidden sm:inline">Details</span>
              </div>
            </div>
          )}

          {/* STEP 1: VEHICLE & PACKAGE */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 relative z-10 max-h-[62vh] overflow-y-auto pr-1 sm:pr-2"
            >
              {/* 1. Vehicle Type Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2.5">
                  1. Select Vehicle Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {VEHICLE_TYPES.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVehicleTypeId(v.id)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${vehicleTypeId === v.id
                        ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.25)] font-bold ring-1 ring-yellow-400'
                        : 'border-neutral-800 bg-neutral-900/70 text-gray-300 hover:border-neutral-700 hover:bg-neutral-800'
                        }`}
                    >
                      <span className="text-2xl">{v.icon}</span>
                      <span className="text-xs">{v.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Detailing Package Selection (Single-Time Service) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                    2. Select Detailing Package
                  </label>
                  <span className="text-[10px] text-gray-400 font-medium">Single-Time Services</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {SERVICES.map((pkg) => {
                    const isSelected = selectedPackage === pkg.title;
                    const price = pkg.prices[vehicleTypeId];
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg.title)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${isSelected
                          ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_12px_rgba(250,204,21,0.25)] ring-1 ring-yellow-400'
                          : 'border-neutral-800 bg-neutral-900/70 hover:border-neutral-700 hover:bg-neutral-800'
                          }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className={`font-bold text-sm truncate ${isSelected ? 'text-yellow-400' : 'text-white'}`}>
                            {pkg.title}
                          </span>
                          <span className="text-xs font-extrabold text-white bg-black/70 px-2.5 py-0.5 rounded-full border border-neutral-700 shrink-0">
                            ₹ {price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{pkg.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Monthly Packages Selection */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                    3. Monthly Packages
                  </label>
                  <span className="text-[10px] text-yellow-400 font-semibold">Routine Maintenance</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {MONTHLY_PACKAGES.map((pkg) => {
                    const isSelected = selectedPackage === pkg.name;
                    const price = pkg.prices[vehicleTypeId];
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg.name)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${isSelected
                          ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_12px_rgba(250,204,21,0.25)] ring-1 ring-yellow-400'
                          : 'border-neutral-800 bg-neutral-900/70 hover:border-neutral-700 hover:bg-neutral-800'
                          }`}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-2 right-2.5 bg-yellow-400 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.5)]">
                            {pkg.badge || 'POPULAR'}
                          </span>
                        )}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-bold text-sm ${isSelected ? 'text-yellow-400' : 'text-white'}`}>
                              {pkg.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 line-clamp-1">{pkg.tagline}</p>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-neutral-800 flex items-baseline justify-between">
                          <span className="text-xs font-black text-yellow-400">
                            ₹ {price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">/ month</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Estimate Summary Bar */}
              <div className="p-3.5 bg-neutral-900/90 border border-neutral-800 rounded-2xl flex items-center justify-between sticky bottom-0 z-20 backdrop-blur-md">
                <div>
                  <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Estimated Quote</span>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-xl font-extrabold text-yellow-400">
                      ₹ {estimatedPrice.toLocaleString('en-IN')}
                    </span>
                    {isMonthly && (
                      <span className="text-xs text-yellow-400/90 font-bold">/ month</span>
                    )}
                    <span className="text-xs text-gray-400 hidden sm:inline">
                      ({activeVehicleObj.name} • {isMonthly ? 'Monthly Pack' : 'Single Service'})
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl text-sm shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Next: Schedule</span>
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DATE, TIME & SERVICE MODE */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 relative z-10"
            >
              {/* Service Mode Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2.5">
                  1. Choose Service Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setServiceMode('Pickup & Drop')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${serviceMode === 'Pickup & Drop'
                      ? 'border-yellow-400 bg-yellow-400/10 text-white shadow-[0_0_12px_rgba(250,204,21,0.25)]'
                      : 'border-neutral-800 bg-neutral-900/70 text-gray-400 hover:bg-neutral-800'
                      }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-yellow-400 text-lg border border-neutral-700 shrink-0">
                      <FaBuilding />
                    </div>
                    <div>
                      <span className="font-bold text-sm block text-white">Pickup & Drop</span>
                      <span className="text-[11px] text-gray-400">DustX Detailing Studio, Trivandrum</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceMode('Doorstep Service')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${serviceMode === 'Doorstep Service'
                      ? 'border-yellow-400 bg-yellow-400/10 text-white shadow-[0_0_12px_rgba(250,204,21,0.25)]'
                      : 'border-neutral-800 bg-neutral-900/70 text-gray-400 hover:bg-neutral-800'
                      }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-yellow-400 text-lg border border-neutral-700 shrink-0">
                      <FaTruck />
                    </div>
                    <div>
                      <span className="font-bold text-sm block text-white">Doorstep Mobile Service</span>
                      <span className="text-[11px] text-gray-400">We bring our detailing van to you</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    <FaCalendarAlt className="inline mr-1 text-yellow-400" /> Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    min={minDateStr}
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    className="w-full bg-black border border-neutral-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    <FaClock className="inline mr-1 text-yellow-400" /> Preferred Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-black border border-neutral-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-yellow-400"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="pt-3 flex items-center justify-between border-t border-neutral-800">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2.5 text-gray-400 hover:text-white font-semibold text-sm flex items-center gap-2 cursor-pointer"
                >
                  <FaArrowLeft className="text-xs" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl text-sm shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Contact Details</span>
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CONTACT & SUBMIT */}
          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-4 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-black border border-neutral-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-black border border-neutral-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-black border border-neutral-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Locality / Pincode {serviceMode === 'Doorstep Service' && '*'}
                  </label>
                  <input
                    type="text"
                    required={serviceMode === 'Doorstep Service'}
                    placeholder="e.g. Kovalam"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-black border border-neutral-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Car Model & Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 2023 Black Skoda Slavia, focus on front bumper scratch"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-black border border-neutral-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-yellow-400"
                />
              </div>

              {submitError && (
                <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded-xl">
                  {submitError}
                </div>
              )}

              {/* Final Submit & Back Buttons */}
              <div className="pt-3 flex items-center justify-between border-t border-neutral-800">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2.5 text-gray-400 hover:text-white font-semibold text-sm flex items-center gap-2 cursor-pointer"
                >
                  <FaArrowLeft className="text-xs" /> Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-black font-extrabold rounded-xl text-sm shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Confirm & Book ({priceDisplay})</span>
                      <FaCheckCircle className="text-xs" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: CONFIRMATION & BONUS WHATSAPP VERIFY */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4 space-y-6 relative z-10"
            >
              <div className="w-16 h-16 bg-green-500/10 border-2 border-green-400 text-green-400 rounded-full flex items-center justify-center mx-auto text-3xl shadow-[0_0_25px_rgba(74,222,128,0.3)]">
                <FaCheckCircle />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full">
                  Booking Request Received
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
                  Thank You, {customerName}!
                </h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto mt-2">
                  Your appointment for <strong className="text-white">{selectedPackage}</strong> on <strong className="text-white">{serviceDate}</strong> has been logged with reference:
                </p>
                <div className="inline-block mt-3 px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-yellow-400 font-mono font-bold text-base tracking-wider">
                  Ref: {bookingRef}
                </div>
              </div>

              {/* Appointment summary card */}
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 text-left max-w-md mx-auto text-xs space-y-1.5 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle:</span>
                  <span className="font-semibold text-white">{activeVehicleObj.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Plan Type:</span>
                  <span className="font-semibold text-white">{isMonthly ? 'Monthly Maintenance Plan' : 'Single Detailing Service'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Schedule:</span>
                  <span className="font-semibold text-white">{serviceDate} • {timeSlot.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mode:</span>
                  <span className="font-semibold text-white">{serviceMode}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-800 pt-1.5">
                  <span className="text-gray-400">Estimated Total:</span>
                  <span className="font-bold text-yellow-400 text-sm">{priceDisplay}</span>
                </div>
              </div>

              {/* Bonus Instant WhatsApp Verify Action */}
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <a
                  href={getWhatsAppVerifyUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-sm shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>Verify Immediately on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-gray-300 font-medium rounded-xl text-xs border border-neutral-800 transition-colors cursor-pointer"
                >
                  Done & Back to Site
                </button>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default BookingModal;
