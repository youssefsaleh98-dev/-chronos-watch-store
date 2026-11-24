
import React from "react";
import { Link } from "react-router-dom";
import {
  FiAward,
  FiShield,
  FiTruck,
  FiHeart,
} from "react-icons/fi";

const About = () => {
  return (
    <div className="bg-[#080808] text-white min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524805444758-089113d48a6d')] bg-cover bg-center opacity-30"></div>

        <div className="relative z-10">
          <p className="text-[#d4af37] tracking-[5px] uppercase mb-4">
            Our Story
          </p>

          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            Time Is <span className="text-[#d4af37]">Luxury</span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-300 leading-8">
            Discover the art of timeless elegance.
            Every watch tells a story, and every moment
            deserves something extraordinary.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <p className="text-[#d4af37] uppercase tracking-widest mb-3">
            Who We Are
          </p>

          <h2 className="text-4xl font-serif mb-6">
            More Than Just A Watch
          </h2>

          <p className="text-gray-400 leading-8 mb-5">
            At CHRONOS, we believe that a watch is more than
            an accessory. It represents personality, ambition,
            and timeless style.
          </p>

          <p className="text-gray-400 leading-8 mb-8">
            Our collection brings together elegant designs
            and carefully selected watches for people who
            appreciate quality and detail.
          </p>

          <Link
            to="/shop"
            className="inline-block bg-[#d4af37] text-black px-8 py-3 uppercase tracking-wider hover:bg-white transition"
          >
            Explore Collection
          </Link>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49"
            alt="Luxury watch"
            className="w-full h-[450px] object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#111] py-20 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-[#d4af37] tracking-widest uppercase mb-3">
              Why CHRONOS
            </p>

            <h2 className="text-4xl font-serif">
              What Makes Us Different
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="text-center p-6">
              <FiAward className="text-[#d4af37] text-4xl mx-auto mb-5" />
              <h3 className="text-xl mb-3">Premium Quality</h3>
              <p className="text-gray-400 leading-7">
                Carefully selected watches with elegant designs.
              </p>
            </div>

            <div className="text-center p-6">
              <FiShield className="text-[#d4af37] text-4xl mx-auto mb-5" />
              <h3 className="text-xl mb-3">Trusted Shopping</h3>
              <p className="text-gray-400 leading-7">
                A simple and secure shopping experience.
              </p>
            </div>

            <div className="text-center p-6">
              <FiTruck className="text-[#d4af37] text-4xl mx-auto mb-5" />
              <h3 className="text-xl mb-3">Fast Delivery</h3>
              <p className="text-gray-400 leading-7">
                Get your favorite watches delivered to your door.
              </p>
            </div>

            <div className="text-center p-6">
              <FiHeart className="text-[#d4af37] text-4xl mx-auto mb-5" />
              <h3 className="text-xl mb-3">Customer First</h3>
              <p className="text-gray-400 leading-7">
                Your satisfaction is at the heart of everything we do.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-4xl font-serif mb-5">
          Find Your Perfect Watch
        </h2>

        <p className="text-gray-400 mb-8">
          Explore our collection and make every second count.
        </p>

        <Link
          to="/shop"
          className="border border-[#d4af37] text-[#d4af37] px-8 py-3 hover:bg-[#d4af37] hover:text-black transition"
        >
          Shop Now
        </Link>
      </section>

    </div>
  );
};

export default About;
