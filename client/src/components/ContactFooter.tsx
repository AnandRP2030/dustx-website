import { useState } from 'react';

function ContactFooter() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setStatus('submitting');

    const form = e.target;
    const data = new FormData(form);

    try {
      const API = `https://formspree.io/f/xwvdbngl`;
      const response = await fetch(API, {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset(); 
        
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-neutral-900 py-16 px-4 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Contact Info Section */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-4">Contact <span className="text-yellow-400">DustX</span></h3>
          <p className="text-gray-400 mb-2"><strong>Phone:</strong> 95674 87057, 97467 62831</p>
          <p className="text-gray-400 mb-2"><strong>Whatsapp:</strong> 95674 87057, 97467 62831</p>
          <p className="text-gray-400 mb-2"><strong>Email:</strong> dustx.carservice@gmail.com </p>
          <p className="text-gray-400 mb-6"><strong>Location:</strong> Trivandrum, Kerala</p>
          <p className="text-gray-500 text-sm">© 2026 DustX Car Service. All rights reserved.</p>
        </div>
        
        {/* Functional Form Section */}
        <div>
          {/* Attach our custom handleSubmit function */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="bg-black border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-400"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="bg-black border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-400"
            />
            <textarea
              name="message"
              required
              placeholder="How can we help your car?"
              rows={4}
              className="bg-black border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-400"
            ></textarea>
            
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {/* Dynamic Feedback Messages */}
            {status === 'success' && (
              <p className="text-green-400 font-semibold text-center mt-2">
                Message sent successfully! We will get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400 font-semibold text-center mt-2">
                Oops! There was a problem sending your message. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </footer>
  );
}

export default ContactFooter;