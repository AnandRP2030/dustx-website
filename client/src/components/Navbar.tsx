import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaBars, FaTimes, FaCarAlt } from 'react-icons/fa';
import { IoShieldCheckmark, IoSparkles } from 'react-icons/io5';

interface NavItem {
  name: string;
  href: string;
}

const navLinks: NavItem[] = [
  { name: 'Services', href: '#services' },
  { name: 'Transformations', href: '#results' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll detection for glassmorphic styling and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // If user has scrolled to the bottom of the page, activate Contact
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // If at top of page, clear active highlights
      if (window.scrollY < 150) {
        setActiveSection('');
        return;
      }

      // Check sections from bottom to top
      const sections = ['contact', 'pricing', 'results', 'services'];
      const scrollTrigger = window.scrollY + window.innerHeight * 0.35;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollTrigger >= top) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/85 backdrop-blur-xl border-b border-neutral-800/80 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-10 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-transform duration-300 group-hover:scale-105">
            <FaCarAlt className="text-xl" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-wider text-white">
              DUST<span className="text-yellow-400">X</span>
            </span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-gray-400 font-semibold -mt-1">
              Precision Car Care
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-yellow-400 font-bold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:9567487057"
            className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-yellow-400 px-3.5 py-2 rounded-full border border-neutral-800 bg-neutral-900/60 hover:border-yellow-400/40 transition-all duration-300"
            title="Call DustX"
          >
            <FaPhoneAlt className="text-yellow-400 text-xs" />
            <span>95674 87057</span>
          </a>

          <button
            onClick={() => handleNavClick('#pricing')}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.4)] hover:shadow-[0_0_25px_rgba(250,204,21,0.7)] transition-all duration-300 cursor-pointer flex items-center gap-1.5"
          >
            <IoSparkles className="text-xs" />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden text-gray-200 hover:text-yellow-400 p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 focus:outline-none transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <FaTimes className="text-xl text-yellow-400" /> : <FaBars className="text-xl" />}
        </button>

      </div>

      {/* Mobile Glassmorphic Drawer Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-neutral-950/95 backdrop-blur-2xl border-b border-neutral-800 px-6 py-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={`flex items-center justify-between text-left text-base font-semibold py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-yellow-400/10 text-yellow-400 border-l-2 border-yellow-400'
                        : 'text-gray-300 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <IoShieldCheckmark className="text-yellow-400" />}
                  </button>
                );
              })}

              {/* Mobile Quick Action Buttons */}
              <div className="pt-4 mt-2 border-t border-neutral-800/80 flex flex-col gap-3">
                <a
                  href="tel:9567487057"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-gray-200 border border-neutral-700 font-semibold rounded-xl text-sm transition-colors"
                >
                  <FaPhoneAlt className="text-yellow-400 text-xs" />
                  <span>Call 95674 87057</span>
                </a>

                <button
                  onClick={() => handleNavClick('#pricing')}
                  className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl text-sm shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all cursor-pointer"
                >
                  Book a Service
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
