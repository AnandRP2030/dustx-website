import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowsAltH, FaShieldAlt, FaCouch, FaLightbulb, FaCheckCircle } from 'react-icons/fa';

interface TransformationScenario {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
  benefits: string[];
}

const scenarios: TransformationScenario[] = [
  {
    id: 'paint-correction',
    title: 'Paint Correction & Ceramic Shield',
    category: 'Exterior Detailing',
    icon: <FaShieldAlt className="text-xl" />,
    beforeImg: '/images/paint-before.jpg',
    afterImg: '/images/paint-after.jpg',
    beforeLabel: 'Scratched & Dull',
    afterLabel: '9H Mirror Gloss',
    description: 'Eliminates 90%+ of spiderweb swirl marks, micro-scratches, and oxidation. Finished with ultra-hydrophobic 9H ceramic shield for deep wet-look gloss and years of paint protection.',
    benefits: ['Swirl & hologram removal', 'Deep wet-look reflection', '3-year ceramic hydrophobic shield', 'UV oxidation protection']
  },
  {
    id: 'interior-clean',
    title: 'Luxury Interior Steam Clean & Leather Restore',
    category: 'Interior Detailing',
    icon: <FaCouch className="text-xl" />,
    beforeImg: '/images/interior-before.jpg',
    afterImg: '/images/interior-after.jpg',
    beforeLabel: 'Stained & Dusty',
    afterLabel: 'Sanitized OEM Matte',
    description: 'Deep high-temperature steam extraction, antibacterial sanitization, and specialized pH-balanced leather conditioning to return high-contact surfaces to factory freshness.',
    benefits: ['Hot steam stain extraction', '99.9% germ & odor elimination', 'Matte OEM leather nourishment', 'Crevice & vent detailing']
  },
  {
    id: 'headlight-restoration',
    title: 'Headlight Lens Clarity & UV Seal',
    category: 'Restoration',
    icon: <FaLightbulb className="text-xl" />,
    beforeImg: '/images/headlight-before.jpg',
    afterImg: '/images/headlight-after.jpg',
    beforeLabel: 'Yellowed & Foggy',
    afterLabel: 'Crystal Clear',
    description: 'Multi-stage wet sanding and chemical compounding to remove yellowed oxidation layers, sealed with durable UV protective clear coat for maximum night visibility.',
    benefits: ['Restores 100% light output', 'Eliminates cloudy oxidation', 'Durable UV blocker coat', 'Passes strict fitness checks']
  }
];

interface BeforeAfterSliderProps {
  onOpenBooking?: (treatmentName?: string) => void;
}

function BeforeAfterSlider({ onOpenBooking }: BeforeAfterSliderProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentScenario = scenarios[activeTab];

  const updatePositionFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updatePositionFromClientX(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  // Reset slider to middle when tab switches
  useEffect(() => {
    setSliderPosition(50);
  }, [activeTab]);

  return (
    <section id="results" className="py-24 px-4 md:px-10 bg-black text-white relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute -top-24 -left-24 w-80 h-80 md:w-[480px] md:h-[480px] bg-yellow-500/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 md:w-[480px] md:h-[480px] bg-yellow-400/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-72 bg-yellow-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-yellow-400 font-semibold tracking-widest text-xs md:text-sm uppercase px-3.5 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full inline-block mb-3">
              Real Transformations
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Before & <span className="text-yellow-400">After</span> Results
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-base md:text-lg">
              Drag the interactive slider to see the precision difference DustX delivers on paint, upholstery, and optical clarity.
            </p>
          </motion.div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {scenarios.map((scenario, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={scenario.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer text-sm md:text-base border ${
                    isActive
                      ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)] font-bold'
                      : 'bg-neutral-900/80 text-gray-300 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800'
                  }`}
                >
                  <span>{scenario.icon}</span>
                  <span>{scenario.title.split('&')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Comparison Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-950/80 border border-neutral-800 p-4 md:p-8 rounded-3xl backdrop-blur-sm shadow-2xl">
          
          {/* Interactive Image Slider (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="slider"
              aria-label="Before and After comparison slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPosition)}
              className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none border border-neutral-800 shadow-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 group touch-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScenario.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative"
                >
                  {/* AFTER Image (Background Base) */}
                  <img
                    src={currentScenario.afterImg}
                    alt={currentScenario.afterLabel}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />

                  {/* BEFORE Image (Overlay with Clip Path) */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                    style={{
                      clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                    }}
                  >
                    <img
                      src={currentScenario.beforeImg}
                      alt={currentScenario.beforeLabel}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      draggable={false}
                    />
                  </div>

                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/80 backdrop-blur-md text-gray-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/10 shadow-lg pointer-events-none flex items-center gap-1.5 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    <span>BEFORE</span>
                    <span className="hidden sm:inline text-gray-400 font-normal">| {currentScenario.beforeLabel}</span>
                  </div>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-yellow-400/95 backdrop-blur-md text-black text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-yellow-300 shadow-lg pointer-events-none flex items-center gap-1.5 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                    <span>AFTER</span>
                    <span className="hidden sm:inline text-black/80 font-medium">| {currentScenario.afterLabel}</span>
                  </div>

                  {/* Glowing Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.9)] pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    {/* Glowing Circular Handle */}
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/90 border-2 border-yellow-400 rounded-full flex items-center justify-center text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)] backdrop-blur-md transition-transform duration-150 group-hover:scale-110">
                      <FaArrowsAltH className="text-base md:text-lg animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Drag Hint & Keyboard helper */}
            <div className="flex justify-between items-center w-full px-2 mt-3 text-xs text-gray-500 font-medium">
              <span>← Slide Left for AFTER</span>
              <span className="hidden sm:inline">Tip: Use Left/Right arrow keys</span>
              <span>Slide Right for BEFORE →</span>
            </div>
          </div>

          {/* Details & Benefits Column (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScenario.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-semibold text-yellow-400 tracking-wider uppercase">
                    {currentScenario.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
                    {currentScenario.title}
                  </h3>
                  <p className="text-gray-400 mt-3 text-sm md:text-base leading-relaxed">
                    {currentScenario.description}
                  </p>
                </div>

                {/* Key Benefits List */}
                <div className="space-y-2.5 pt-2 border-t border-neutral-800">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Treatment Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentScenario.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <FaCheckCircle className="text-yellow-400 shrink-0 text-xs" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      if (onOpenBooking) {
                        onOpenBooking(currentScenario.title);
                      } else {
                        window.open('https://wa.me/7012947094?text=Hi%20DustX!%20I%20am%20interested%20in%20the%20transformation%20package.', '_blank');
                      }
                    }}
                    className="inline-flex items-center justify-center px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.6)] transition-all duration-300 text-sm cursor-pointer"
                  >
                    Book This Treatment
                  </button>
                  <button
                    onClick={() => {
                      const pricingSection = document.getElementById('pricing');
                      if (pricingSection) {
                        pricingSection.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center justify-center px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-gray-200 border border-neutral-700 hover:border-yellow-400/50 font-semibold rounded-xl transition-all duration-300 text-sm cursor-pointer"
                  >
                    View Packages
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

export default BeforeAfterSlider;
