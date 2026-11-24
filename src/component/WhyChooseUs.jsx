import React from "react";
import {
  FiTruck,
  FiShield,
  FiAward,
  FiHeadphones,
} from "react-icons/fi";

const features = [
  {
    icon: <FiTruck />,
    title: "Free Shipping",
    description: "Get free delivery on all orders.",
  },
  {
    icon: <FiShield />,
    title: "2 Year Warranty",
    description: "Shop with complete confidence.",
  },
  {
    icon: <FiAward />,
    title: "100% Authentic",
    description: "Guaranteed original products.",
  },
  {
    icon: <FiHeadphones />,
    title: "24/7 Support",
    description: "We're here to help anytime.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-16">
      <div className="container mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-[#d4af37] tracking-[4px] text-sm mb-3">
            WHY CHOOSE US
          </p>

          <h2 className="text-3xl md:text-5xl font-bold">
            WHY CHOOSE <span className="text-[#d4af37]">CHRONOS?</span>
          </h2>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#d4af37]/50">

          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center px-6 py-10 border-b sm:border-r border-[#d4af37]/30 last:border-r-0 lg:border-b-0"
            >
              {/* Icon */}
              <div className="text-[#d4af37] text-4xl flex justify-center mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;