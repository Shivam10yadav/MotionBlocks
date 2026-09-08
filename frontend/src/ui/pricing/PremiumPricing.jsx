import React from 'react';

const plans = [
  {
    name: 'Essentials',
    description: 'Our standard 3D package',
    price: '$60k',
    color: 'bg-[#E08D79]', // Terracotta / Coral
    accentColor: 'bg-[#C87561]',
    textColor: 'text-gray-900',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'Best for offering multiple experiences',
    price: '$112k',
    color: 'bg-[#89B0AE]', // Muted Blue / Teal
    accentColor: 'bg-[#739B99]',
    textColor: 'text-gray-900',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Best for global, complex use cases',
    price: '$160k',
    color: 'bg-[#A3C9A8]', // Soft Sage Green
    accentColor: 'bg-[#8BB290]',
    textColor: 'text-gray-900',
    popular: false,
  },
];

const features = [
  { name: 'Hosting & Visualization of 3D Assets*', tiers: [true, true, true] },
  { name: 'Configuration', tiers: [true, true, true] },
  { name: 'Analytics', tiers: [true, true, true] },
  { name: 'Augmented Reality', tiers: [false, true, true] },
  { name: 'Virtual Photographer', tiers: [false, true, true] },
  { name: 'Threekit AI', tiers: [false, true, true] },
];

export default function PremiumPricing() {
  return (
    <div className="min-h-screen bg-[#111618] text-white px-6 py-16 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <h1 className="text-6xl md:text-8xl font-normal text-gray-400 mb-16 tracking-tight">
          Simple <span className="text-gray-600">pricing</span>
        </h1>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end mb-16">
          
          {/* Left Title Box */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-medium text-gray-200 leading-snug">
              Your Visual<br />
              Commerce<br />
              Toolkit
            </h2>
          </div>

          {/* Cards */}
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative ${plan.color} ${plan.textColor} rounded-2xl p-6 flex flex-col justify-between h-[360px] shadow-lg transition-transform hover:-translate-y-1`}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Most Popular!
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <p className="text-xs text-gray-800 leading-snug font-medium mb-6">
                  {plan.description}
                </p>
                <div className="text-4xl font-semibold tracking-tight">{plan.price}</div>
              </div>

              {/* Action Button */}
              <button className="w-full py-3 bg-[#1B2326] hover:bg-[#111618] text-white font-medium text-sm rounded-xl transition-colors">
                Get started
              </button>
            </div>
          ))}
        </div>

        {/* Key Features Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-white mb-6">Key Features</h3>

          {/* Feature Matrix Table */}
          <div className="divide-y divide-gray-800">
            {features.map((feature, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 py-4 items-center">
                
                {/* Feature Name */}
                <div className="md:col-span-1 text-sm font-medium text-gray-300">
                  {feature.name}
                </div>

                {/* Tier Checks */}
                {feature.tiers.map((included, tierIdx) => (
                  <div key={tierIdx} className="flex justify-center md:justify-center py-2 md:py-0">
                    {included ? (
                      <CheckIcon planIndex={tierIdx} />
                    ) : (
                      <span className="text-gray-500 text-lg">-</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Custom SVG Checkmark Icon matching the color theme per tier
function CheckIcon({ planIndex }) {
  const bgColors = ['bg-[#E08D79]', 'bg-[#89B0AE]', 'bg-[#A3C9A8]'];
  
  return (
    <div className={`w-6 h-6 rounded-full ${bgColors[planIndex]} flex items-center justify-center text-[#111618]`}>
      <svg
        className="w-4 h-4 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="3"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </div>
  );
}