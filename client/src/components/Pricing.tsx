const packages = [
  { name: "Basic Wash", price: "₹ 299", features: ["Exterior Wash", "Tire Dressing", "Window Cleaning"] },
  { name: "DustX Pro", price: "₹ 2,999", features: ["Basic Wash", "Interior Vacuum", "Wax Application", "Engine Bay Wipe"] },
  { name: "Ultimate Detail", price: "₹ 7,499", features: ["DustX Pro", "Ceramic Coating", "Deep Carpet Shampoo", "Paint Correction"] },
];

function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 md:px-10 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">Pricing & <span className="text-yellow-400">Packages</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 transition-transform duration-300 md:hover:scale-105 md:hover:border-yellow-400 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">{pkg.name}</h3>
              <p className="text-4xl font-extrabold text-white mb-6">{pkg.price}</p>
              
              <ul className="mb-8 flex-1">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="text-gray-300 mb-2 flex items-center">
                    <span className="text-yellow-400 mr-2">✓</span> {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full py-3 border-2 border-yellow-400 text-yellow-400 font-bold rounded-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300">
                Select Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;