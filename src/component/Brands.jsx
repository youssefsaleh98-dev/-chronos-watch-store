
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBrands = async () => {
      try {
        const [menResponse, womenResponse] = await Promise.all([
          fetch("https://dummyjson.com/products/category/mens-watches"),
          fetch("https://dummyjson.com/products/category/womens-watches"),
        ]);

        if (!menResponse.ok || !womenResponse.ok) {
          throw new Error("Failed to fetch brands");
        }

        const menData = await menResponse.json();
        const womenData = await womenResponse.json();

        const allProducts = [
          ...menData.products,
          ...womenData.products,
        ];

        // Get unique brands
        const uniqueBrands = [
          ...new Map(
            allProducts
              .filter((product) => product.brand)
              .map((product) => [product.brand, product])
          ).values(),
        ];

        setBrands(uniqueBrands);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getBrands();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#111] text-[#d4af37] text-center py-20">
        Loading Brands...
      </div>
    );
  }

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
            DISCOVER YOUR STYLE
          </p>

          <h2 className="text-3xl md:text-5xl font-bold">
            SHOP BY <span className="text-[#d4af37]">BRAND</span>
          </h2>

          <p className="text-gray-400 mt-5">
            Explore our exclusive watch brands.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {brands.map((brand) => (
            <Link
  key={brand.brand}
  to={`/brands/${brand.brand}`}
  className="bg-[#1a1a1a] group overflow-hidden border border-[#d4af37]/10 hover:border-[#d4af37] transition duration-300 block"
>
              <div className="h-52 bg-white overflow-hidden">
                <img
                  src={brand.thumbnail}
                  alt={brand.brand}
                  className="w-full h-full object-contain p-5 group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="text-center py-6">
                <h3 className="text-xl font-semibold tracking-wider">
                  {brand.brand}
                </h3>

                <p className="text-[#d4af37] text-sm mt-2">
                  EXPLORE COLLECTION
                </p>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Brands;
