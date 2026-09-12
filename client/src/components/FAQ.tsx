import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How much time is required to complete a service?",
    answer: "A standard wash generally takes up to 1 hour, though this can vary based on the specific vehicle condition. Comprehensive detailing services require additional care and typically take around 3 to 4 hours to complete."
  },
  {
    question: "How does Doorstep Detailing work? Do I need to provide power and water?",
    answer: "For doorstep service, our team arrives with all specialized equipment, polishers, steam extractors, and detailing chemicals. The customer only needs to provide a standard domestic water tap connection, an electrical power plug point, and adequate parking space around the car."
  },
  {
    question: "How does the Pickup and Drop service work?",
    answer: "Our team will collect your vehicle from your specified location and safely transport it to our dedicated detailing studio. Once all requested services are fully completed, we will promptly deliver the freshly detailed vehicle back to your doorstep."
  },
  {
    question: "Do I need to pay any advance money to book a service?",
    answer: "No, we do not require any advance payments. You can simply pay the full amount once the service is completed and you are completely satisfied with the results."
  },
  {
    question: "What happens if I am not satisfied with the service?",
    answer: "Customer satisfaction is our top priority. If you are not completely happy with the results, simply let our team know, and we will rectify the issue or re-do the specific service."
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
