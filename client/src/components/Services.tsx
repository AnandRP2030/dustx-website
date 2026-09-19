import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import { SERVICES } from '../data/packagesData';

interface ServicesProps {
  onOpenBooking?: (serviceName?: string) => void;
}

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
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
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
                    {service.startingPrice}
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
                <div className="space-y-2 pt-4 border-t border-neutral-800/80 mb-6" style={{maxHeight: '80px', overflow: 'auto'}}>
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
          {/* Guarantee Banner */}
          <div className="mt-14 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-300">
            <FaShieldAlt className="text-2xl text-yellow-400 shrink-0" />
            <span>
              Services marked with<strong> * </strong> are condition dependent. Charges may vary based on the vehicle's condition.
            </span>
          </div>

      </div>
    </section>
  );
}

export default Services;