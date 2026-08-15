import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaCheckCircle, FaCar } from 'react-icons/fa';

const reviews = [
  {
    name: "Govind SS",
    location: "Kovalam, Trivandrum",
    car: "BMW 330i M-Sport (Black Sapphire)",
    rating: 5,
    date: "1 week ago",
    service: "Ultimate Detail + 9H Ceramic",
    review: "The paint correction on my black 330i completely eliminated years of swirl marks. The deep wet-look reflection is better than when I took delivery from the showroom. Highly recommended!"
  },
  {
    name: "Kailas Nath",
    location: "Kovalam, Trivandrum",
    car: "Mahindra Thar 4x4 (Napoli Black)",
    rating: 5,
    date: "2 weeks ago",
    service: "Interior Steam Clean + Underbody",
    review: "Had so much dried red clay and upholstery mud from our Munnar off-roading trip. The DustX doorstep van came to Technopark and restored the interior to brand-new condition in 3 hours."
  },
  {
    name: "Dr. Ananya Menon",
    location: "Sasthamangalam, Trivandrum",
    car: "Mercedes-Benz C-Class C200",
    rating: 5,
    date: "3 weeks ago",
    service: "DustX Pro Package",
    review: "Super professional and meticulous team. They pay immense attention to small details like AC vent crevices, brake calipers, and leather texture. Will definitely use their regular maintenance pass."
  }
];

function Testimonials() {
  return (
    <section id="reviews" className="py-24 px-4 md:px-10 bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 blur-[130px] rounded-full pointer-events-none" />

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
              Verified Experiences
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Trusted by <span className="text-yellow-400">Car Enthusiasts</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-base md:text-lg">
              Read genuine reviews from luxury car owners and daily drivers across Trivandrum.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-900/60 border border-neutral-800 hover:border-yellow-400/50 p-8 rounded-3xl backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-yellow-400 gap-1 text-sm">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <FaQuoteLeft className="text-neutral-800 text-2xl" />
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  "{item.review}"
                </p>
              </div>

              {/* User and Car Details */}
              <div className="pt-4 border-t border-neutral-800/80">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white text-sm">{item.name}</span>
                  <FaCheckCircle className="text-yellow-400 text-xs" title="Verified Customer" />
                </div>

                <span className="text-[11px] text-gray-400 block mb-2">{item.location}</span>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-black rounded-lg border border-neutral-800 text-[11px] text-yellow-400/90 font-medium">
                  <FaCar className="text-xs shrink-0" />
                  <span className="truncate">{item.car}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
