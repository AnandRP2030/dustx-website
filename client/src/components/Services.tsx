import { motion } from 'framer-motion';
import { FaCar, FaSprayCan, FaWrench, FaCouch, FaShower, FaLightbulb, FaCheck, FaArrowRight } from 'react-icons/fa';

interface ServicesProps {
  onOpenBooking?: (serviceName?: string) => void;
}

const servicesData = [
  {
    title: "9H Ceramic Coating",
    icon: <FaCar className="text-3xl text-yellow-400" />,
    tagline: "Ultimate 3-Year Paint Shield",
    price: "From ₹ 5,999",
    description: "Multi-layered German nano-quartz coating delivering deep wet-look reflection, extreme hydrophobic water beading, and UV protection.",
    features: ["9H Pencil Hardness Shield", "Hydrophobic Water Beading", "3-Year Warranty Certificate"]
  },
  {
    title: "Paint Correction",
    icon: <FaSprayCan className="text-3xl text-yellow-400" />,
    tagline: "90%+ Swirl & Scratch Removal",
    price: "From ₹ 3,499",
    description: "Two-stage compounding and jeweling rotary polish to eliminate swirl marks, spiderweb scratches, holograms, and oxidation.",
    features: ["Digital Paint Depth Check", "Swirl & Scuff Removal", "Mirror Optical Clarity"]
  },
  {
    title: "Interior Steam Detailing",
    icon: <FaCouch className="text-3xl text-yellow-400" />,
    tagline: "Deep Upholstery Sanitization",
    price: "From ₹ 2,499",
    description: "High-temperature antibacterial steam extraction, deep carpet shampooing, and specialized pH-balanced leather conditioning.",
    features: ["99.9% Bacteria & Odor Removal", "Matte OEM Leather Care", "Air Duct Steam Purge"]
  },
  {
    title: "Engine Bay Detailing",
    icon: <FaWrench className="text-3xl text-yellow-400" />,
    tagline: "De-grease & Protective Dressing",
    price: "From ₹ 999",
    description: "Safe precision cleaning of engine surfaces, removal of oil grime and road debris, sealed with satin temperature-resistant dressing.",
    features: ["Safe Component Masking", "Anti-Corrosion Dressing", "Factory Satin Look"]
  },
  {
    title: "Headlight & Trim Restore",
    icon: <FaLightbulb className="text-3xl text-yellow-400" />,
    tagline: "Crystal Clear Optical Clarity",
    price: "From ₹ 1,199",
    description: "Wet-sanding oxidation removal and UV protective clear coat sealing to restore foggy yellow headlights to maximum brightness.",
    features: ["Wet-Sanding Oxidation Removal", "UV Clear Coat Sealant", "Passes Fitness Test"]
  },
  {
    title: "Premium Foam & Wash",
    icon: <FaShower className="text-3xl text-yellow-400" />,
    tagline: "Grit-Guard Gentle Detailing",
    price: "From ₹ 299",
    description: "Two-bucket wash with high-lubricity pH-neutral snow foam, deep wheel decontamination, tire dressing, and streak-free glass.",
    features: ["pH-Neutral Thick Snow Foam", "Two-Bucket Grit Guard", "Tire & Trim Dressing"]
  }
];

function Services({ onOpenBooking }: ServicesProps) {
  return (
    <section id="services" className="py-24 px-4 md:px-10 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-yellow-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-yellow-400/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-yellow-400 font-bold tracking-widest text-xs uppercase px-3.5 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full inline-block mb-3">
              Craftsmanship & Care
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Our Precision <span className="text-yellow-400">Services</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-base md:text-lg">
              Every vehicle undergoes multi-stage detailing protocols using premium equipment and certified chemicals.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800 hover:border-yellow-400/60 p-7 rounded-3xl backdrop-blur-md flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(250,204,21,0.15)] hover:-translate-y-1.5"
            >
              <div>
                {/* Header row: Icon & Price Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3.5 bg-black rounded-2xl border border-neutral-800 group-hover:border-yellow-400/40 shadow-inner transition-colors duration-300">
                    {service.icon}
                  </div>
                  <span className="text-xs font-black text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full">
                    {service.price}
                  </span>
                </div>

                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  {service.tagline}
                </span>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="space-y-2 pt-4 border-t border-neutral-800/80 mb-6">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-300">
                      <FaCheck className="text-yellow-400 text-[10px] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book button */}
              <button
                onClick={() => onOpenBooking?.(service.title)}
                className="w-full py-3 bg-neutral-950 hover:bg-yellow-400 text-gray-200 hover:text-black border border-neutral-800 hover:border-yellow-400 font-bold rounded-xl text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group/btn"
              >
                <span>Book This Service</span>
                <FaArrowRight className="text-xs transition-transform group-hover/btn:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;