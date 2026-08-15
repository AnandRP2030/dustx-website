import { motion } from 'framer-motion';
import { FaShower, FaCar, FaSprayCan, FaWrench, FaCouch } from 'react-icons/fa';

const servicesData = [
  { title: "Premium Washing", icon: <FaShower className="text-4xl text-yellow-400" /> },
  { title: "Ceramic Coating", icon: <FaCar className="text-4xl text-yellow-400" /> },
  { title: "Spray Painting", icon: <FaSprayCan className="text-4xl text-yellow-400" /> },
  { title: "Engine Detailing", icon: <FaWrench className="text-4xl text-yellow-400" /> },
  { title: "Interior Restoration", icon: <FaCouch className="text-4xl text-yellow-400" /> },
];

function Services() {
  return (
    <section id="services" className="py-20 px-4 md:px-10 bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">Our <span className="text-yellow-400">Services</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-800 p-8 rounded-xl flex flex-col items-center text-center border border-neutral-700 hover:border-yellow-400 transition-colors duration-300"
            >
              <div className="mb-4 p-4 bg-black rounded-full shadow-inner shadow-yellow-400/20">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-100">{service.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;