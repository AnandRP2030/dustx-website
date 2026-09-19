import React, { useState } from 'react';
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaCarAlt,
  FaPaperPlane,
  FaCheckCircle
} from 'react-icons/fa';

function ContactFooter() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const API = `https://formspree.io/f/xppzngny`;

      const response = await fetch(API, {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-neutral-950 text-white pt-24 pb-12 px-4 md:px-10 border-t border-neutral-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Top Split: Studio Info Card + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">

          {/* Left Column: Studio Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                  <FaCarAlt className="text-lg" />
                </div>
                <span className="text-2xl font-black tracking-wider text-white">
                  DUST<span className="text-yellow-400">X</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Trivandrum’s benchmark in automotive paint restoration, 9H ceramic coating, and precision doorstep car care.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <a
                href="tel:9567487057"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-yellow-400/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-black border border-neutral-800 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">Direct Phone</span>
                  <span className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">70129 47094, 97467 62831</span>
                </div>
              </a>

              <a
                href="https://wa.me/7012947094?text=Hi%20DustX!%20I%20would%20like%20to%20inquire%20about%20a%20detailing%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-green-500/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-black border border-neutral-800 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors shrink-0">
                  <FaWhatsapp className="text-lg" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">WhatsApp Concierge</span>
                  <span className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">70129 47094 (Instant Chat)</span>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                <div className="w-10 h-10 rounded-xl bg-black border border-neutral-800 flex items-center justify-center text-yellow-400 shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">Service Locations</span>
                  <span className="text-sm font-bold text-white">Trivandrum</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                <div className="w-10 h-10 rounded-xl bg-black border border-neutral-800 flex items-center justify-center text-yellow-400 shrink-0">
                  <FaClock />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">Operating Hours</span>
                  <span className="text-sm font-bold text-white">Mon – Sun: 8:00 AM – 8:30 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800 p-8 rounded-3xl backdrop-blur-md">
            <span className="text-yellow-400 font-bold text-xs uppercase tracking-widest block mb-1">
              Have a Custom Requirement?
            </span>
            <h3 className="text-2xl font-black text-white mb-6">
              Send Us a <span className="text-yellow-400">Message</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full bg-black border border-neutral-700 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 98765 43210"
                    className="w-full bg-black border border-neutral-700 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. yourname@example.com"
                  className="w-full bg-black border border-neutral-700 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Car Model & Message *
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="How can we help your vehicle (e.g. Ceramic coating quote for BMW 3-series, scratch removal)?"
                  rows={3}
                  className="w-full bg-black border border-neutral-700 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-black font-extrabold rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                {status === 'submitting' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message to DustX</span>
                    <FaPaperPlane className="text-xs" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="p-3.5 bg-green-950/80 border border-green-800 text-green-300 text-xs rounded-xl flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 shrink-0" />
                  <span>Message sent successfully! Our team will connect with you shortly.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3.5 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded-xl">
                  Oops! There was a problem sending your message. Please reach us via WhatsApp or Phone directly.
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Navigation & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 DustX Precision Car Care. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button onClick={() => scrollToSection('services')} className="hover:text-yellow-400 transition-colors cursor-pointer">Services</button>
            <button onClick={() => scrollToSection('results')} className="hover:text-yellow-400 transition-colors cursor-pointer">Transformations</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-yellow-400 transition-colors cursor-pointer">Pricing</button>
            <button onClick={() => scrollToSection('reviews')} className="hover:text-yellow-400 transition-colors cursor-pointer">Reviews</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-yellow-400 transition-colors cursor-pointer">FAQ</button>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default ContactFooter;