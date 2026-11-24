
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Collections = ({title,category}) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Products
  useEffect(() => {
  const getProducts = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=10`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  getProducts();
}, [category]);

  // Loading
  if (loading) {
    return (
      <div className="bg-[#111] text-[#d4af37] text-center py-20">
        Loading Watches...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="bg-[#111] text-red-500 text-center py-20">
        {error}
      </div>
    );
  }

  return (
    <section className="bg-[#111] text-white py-24 px-6 md:px-16">

      <div className="container mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">

          <p className="text-[#d4af37] tracking-[5px] text-sm mb-4">
            OUR EXCLUSIVE COLLECTION
          </p>

          <h2 className="text-3xl md:text-5xl font-bold">
  {title}
</h2>

          <p className="text-gray-400 mt-5">
            Discover our premium watch collection.
          </p>

        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={products.length > 3}
        >

          {products.map((product) => (

            <SwiperSlide key={product.id}>

              <div className="bg-[#1a1a1a] p-4 group">

                {/* Image */}
                <div className="h-[300px] overflow-hidden bg-white">

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain transition duration-500 group-hover:scale-110"
                  />

                </div>

                {/* Information */}
                <div className="py-5">

                  <p className="text-[#d4af37] text-sm mb-2">
                    {product.brand || "CHRONOS COLLECTION"}
                  </p>

                  <h3 className="text-lg font-semibold">
                    {product.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-5">

                    <span className="text-[#d4af37] text-xl font-bold">
                      ${product.price}
                    </span>

                    <span className="text-gray-400">
                      ⭐ {product.rating}
                    </span>

                  </div>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
};

export default Collections;
