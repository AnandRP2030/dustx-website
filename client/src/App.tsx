import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import ContactFooter from './components/ContactFooter';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function App() {
  return (
    <div className="bg-neutral-900 text-gray-100 min-h-screen font-sans overflow-x-hidden">
      <Hero />
      <Services />
      <Pricing />
      <ContactFooter />
      <WhatsAppButton />
    </div>
  );
}

export default App;