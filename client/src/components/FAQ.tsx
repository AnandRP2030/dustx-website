import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How long does a 9H ceramic coating last and how do I maintain it?",
    answer: "Our certified 9H ceramic quartz coatings provide durable hydrophobic protection for up to 3 years. We provide a Certificate of Warranty and a complimentary maintenance care guide. To maintain optimal gloss, we recommend bi-weekly pH-neutral foam washes and avoiding harsh chemical degreasers."
  },
  {
    question: "How does Doorstep Detailing work? Do I need to provide power and water?",
    answer: "For doorstep service, our team arrives with all specialized equipment, polishers, steam extractors, and detailing chemicals. The customer only needs to provide a standard domestic water tap connection, an electrical power plug point, and adequate parking space around the car."
  },
  {
    question: "What is the difference between regular waxing and machine paint correction?",
    answer: "Regular waxing merely fills and masks minor clearcoat imperfections temporarily (lasting 3-6 weeks). Paint correction uses precision dual-action and rotary machines with specialized micro-abrasive compounds to permanently level out 90%+ of swirl marks, scratches, and oxidation, revealing true optical mirror reflection."
  },
  {
    question: "How long does a full detailing service take?",
    answer: "A Basic Wash takes ~45 minutes. The DustX Pro package requires 2 to 3 hours. Comprehensive Ultimate Detailing with multi-stage paint correction and ceramic curing takes between 5 to 7 hours of meticulous manual craftsmanship."
  },
  {
    question: "Do you provide interior leather conditioning and odor removal?",
    answer: "Yes! Our interior detailing includes high-temperature steam extraction (which eliminates 99.9% of bacteria and allergens), antibacterial AC duct purging, and deep pH-balanced leather feeding to prevent cracking while leaving a factory OEM matte finish."
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 md:px-10 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-yellow-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-yellow-400 font-bold tracking-widest text-xs uppercase px-3.5 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full inline-block mb-3">
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Frequently Asked <span className="text-yellow-400">Questions</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mt-4 text-base md:text-lg">
              Everything you need to know about our treatments, booking policy, and car care results.
            </p>
          </motion.div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-neutral-900 border-yellow-400/60 shadow-[0_0_20px_rgba(250,204,21,0.15)]'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className={`font-bold text-base md:text-lg transition-colors ${isOpen ? 'text-yellow-400' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-black/60 border border-neutral-800 text-yellow-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-yellow-400 text-black border-yellow-400' : ''}`}>
                    <FaChevronDown className="text-xs" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-gray-300 text-sm leading-relaxed border-t border-neutral-800/80 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FAQ;
