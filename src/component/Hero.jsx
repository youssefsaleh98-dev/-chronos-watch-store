
import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="min-h-[85vh] bg-[#0d0d0d] text-white px-6 md:px-16 flex items-center overflow-hidden">

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">

        {/* Left Content */}

        <div className="space-y-7 py-16">

          <p className="text-[#d4af37] tracking-[5px] uppercase text-sm">
            Discover Timeless Luxury
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            TIMELESS
            <span className="block text-[#d4af37]">
              ELEGANCE.
            </span>
          </h1>

          <p className="text-gray-400 max-w-md leading-8">
            Discover our exclusive collection of luxury watches.
            Where precision meets elegance, and every second
            tells a story.
          </p>

          {/* Buttons */}

          <div className="flex flex-wrap gap-4 pt-3">

            <Link
              to="/shop"
              className="bg-[#d4af37] text-black px-8 py-4 font-semibold flex items-center gap-3 hover:bg-white transition duration-300"
            >
              SHOP NOW
              <FiArrowUpRight size={20} />
            </Link>

            <Link
              to="/brands"
              className="border border-gray-500 px-8 py-4 hover:border-[#d4af37] hover:text-[#d4af37] transition duration-300"
            >
              EXPLORE
            </Link>

          </div>

          <div className="flex gap-10 pt-8 border-t border-white/10 max-w-md">

            <div>
              <h3 className="text-2xl font-bold text-[#d4af37]">50+</h3>
              <p className="text-gray-500 text-sm">Luxury Models</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#d4af37]">100%</h3>
              <p className="text-gray-500 text-sm">Authentic</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#d4af37]">24/7</h3>
              <p className="text-gray-500 text-sm">Support</p>
            </div>

          </div>

        </div>

        {/* Right Image */}

        <div className="relative flex justify-center items-center">

          <div className="absolute w-72 h-72 md:w-[450px] md:h-[450px] rounded-full bg-[#d4af37]/10 blur-3xl"></div>

          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000"
            alt="Luxury Watch"
            className="relative w-full max-w-[550px] h-[400px] md:h-[600px] object-cover rounded-sm"
          />

        </div>

      </div>

    </section>
  );
};

export default Hero;
