import { FaWhatsapp } from 'react-icons/fa';

function WhatsAppButton() {
  const whatsappNumber = 7012947094;
  const url = `https://wa.me/${whatsappNumber}?text=Hi%20DustX!%20I%20would%20like%20to%20book%20a%20service.`
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50 flex items-center justify-center animate-pulse shadow-green-500/50"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}

export default WhatsAppButton;