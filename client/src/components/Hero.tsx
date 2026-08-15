import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';

interface HeroProps {
  onOpenBooking?: () => void;
}

function Hero({ onOpenBooking }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay prevented by browser policy:', err);
        });
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo, { once: true });
      video.addEventListener('canplay', playVideo, { once: true });
    }

    const handleFirstInteraction = () => {
      if (video.paused) {
        video.play().catch(() => { });
      }
    };

    window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  const handleBookService = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleExploreResults = () => {
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Video Background (Desktop & Mobile) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.png"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Multi-layer Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-neutral-950 via-black/75 to-black/60 z-10 pointer-events-none"></div>

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none z-10" />

      {/* Animated Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">

        {/* Top Trust Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 border border-yellow-400/30 backdrop-blur-xl mb-6 shadow-[0_0_20px_rgba(250,204,21,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-200">
            Trivandrum’s Premier Detailing Studio & Doorstep Care
          </span>
        </motion.div>

        {/* Main Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08] uppercase max-w-4xl"
        >
          Uncompromising <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_35px_rgba(250,204,21,0.35)]">
            Precision Car Care
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-base sm:text-xl text-gray-300 max-w-2xl mt-5 font-normal leading-relaxed"
        >
          Professional car detailing and deep cleaning services delivered right to your doorstep.
        </motion.p>

        {/* Dual CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto"
        >
          <button
            onClick={handleBookService}
            className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-extrabold py-4 px-9 rounded-2xl shadow-[0_0_25px_rgba(250,204,21,0.5)] hover:shadow-[0_0_35px_rgba(250,204,21,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-base"
          >
            <IoSparkles className="text-lg" />
            <span>Book an Appointment</span>
          </button>

          <button
            onClick={handleExploreResults}
            className="w-full sm:w-auto bg-neutral-900/80 hover:bg-neutral-800 text-gray-200 hover:text-white border border-neutral-700 hover:border-yellow-400/50 font-bold py-4 px-8 rounded-2xl backdrop-blur-md transition-all duration-300 cursor-pointer text-base"
          >
            View Transformations
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          onClick={() => {
            const services = document.getElementById('services');
            if (services) services.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mt-10 flex flex-col items-center gap-1.5 text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer"
        >
          <span className="text-[10px] uppercase font-bold tracking-widest">Explore Services</span>
          <FaArrowDown className="text-xs animate-bounce text-yellow-400" />
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;