import { motion } from 'framer-motion';
import { FaCheck, FaCrown, FaShieldAlt } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { MONTHLY_PACKAGES } from '../data/packagesData';

interface PricingProps {
  onSelectPackage?: (pkgName: string) => void;
}

function Pricing({ onSelectPackage }: PricingProps) {
  return (
    <section id="pricing" className="py-24 px-4 md:px-10 bg-neutral-950 text-white relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-500/10 blur-[150px] pointer-events-none rounded-full" />

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
              Transparent Investment
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Pricing & <span className="text-yellow-400">Packages</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-base md:text-lg">
              No hidden fees. All treatments use German detailing formulations and precision machinery.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MONTHLY_PACKAGES.map((pkg, index) => {
            const isFeatured = pkg.popular;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-md ${isFeatured
                    ? 'bg-neutral-900/90 border-2 border-yellow-400 shadow-[0_0_35px_rgba(250,204,21,0.25)] md:-translate-y-2'
                    : 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700'
                  }`}
              >
                {/* Popular Pill Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.6)] flex items-center gap-1.5">
                    <FaCrown className="text-xs" />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                      {pkg.tagline}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {pkg.name}
                    </h3>
                  </div>

                  <div className="mb-8 pb-6 border-b border-neutral-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-white">
                        {pkg.startingPrice}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">/ month</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2">
                      *Price shown for Hatchback. Sedans (+₹100), SUVs (+₹200), Luxury (+₹300).
                    </p>
                  </div>

                  {/* Feature Inclusions */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                      Package Inclusions:
                    </span>
                    {pkg.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <div className="w-4 h-4 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 text-[9px] shrink-0 mt-0.5">
                          <FaCheck />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selection Button */}
                <button
                  onClick={() => onSelectPackage?.(pkg.name)}
                  className={`w-full py-4 rounded-2xl font-extrabold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${isFeatured
                      ? 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:shadow-[0_0_30px_rgba(250,204,21,0.7)]'
                      : 'bg-neutral-950 hover:bg-neutral-800 text-yellow-400 border border-yellow-400/40 hover:border-yellow-400'
                    }`}
                >
                  <IoSparkles className="text-xs" />
                  <span>Select {pkg.name}</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-300">
          <FaShieldAlt className="text-2xl text-yellow-400 shrink-0" />
          <span>
            <strong>100% Satisfaction Guarantee:</strong> We are committed to delivering the highest quality detailing and care for your vehicle.
          </span>
        </div>

      </div>
    </section>
  );
}

export default Pricing;