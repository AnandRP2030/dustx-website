import { motion } from 'framer-motion';

function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background (Desktop) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/hero-video.mp4"
        poster="/hero-poster.png"
      >
        Your browser does not support the video tag.
      </video>


      {/* Dark Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10"></div>

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
          className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)] hover:bg-yellow-300 hover:shadow-[0_0_25px_rgba(250,204,21,0.8)] transition-all duration-300"
        >
          Book a Service
        </motion.button>
      </div>
    </section>
  );
}

export default Hero;