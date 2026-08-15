import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenBooking?: () => void;
}

function Hero({ onOpenBooking }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly set muted attributes on DOM element to comply with Chromium/WebKit autoplay policies
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

    // Fallback for iOS Low Power Mode / aggressive battery saver modes: trigger on first user touch/scroll
    const handleFirstInteraction = () => {
      if (video.paused) {
        video.play().catch(() => {});
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

  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
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

      {/* Dark Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10 pointer-events-none"></div>

      {/* Animated Content */}
      <div className="relative z-20 text-center px-4 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-wider"
        >
          Welcome to <span className="text-yellow-400">DustX</span>
          <br className="hidden md:block" />
          <span className="text-2xl md:text-4xl block mt-2 text-gray-300">Precision Car Care</span>
        </motion.h1>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          onClick={handleBookService}
          className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)] hover:bg-yellow-300 hover:shadow-[0_0_25px_rgba(250,204,21,0.8)] transition-all duration-300 cursor-pointer"
        >
          Book a Service
        </motion.button>
      </div>
    </section>
  );
}

export default Hero;