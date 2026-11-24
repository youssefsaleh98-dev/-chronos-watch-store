import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BrandProducts = () => {
  // Get brand name from URL
  const { brandName } = useParams();

  // States

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        // Fetch men's and women's watches
        const [menResponse, womenResponse] = await Promise.all([
          fetch("https://dummyjson.com/products/category/mens-watches"),
          fetch("https://dummyjson.com/products/category/womens-watches"),
        ]);

        if (!menResponse.ok || !womenResponse.ok) {
          throw new Error("Failed to fetch products");
        }

        const menData = await menResponse.json();
        const womenData = await womenResponse.json();

        // Combine all watches
        const allProducts = [
          ...menData.products,
          ...womenData.products,
        ];

        // Filter products by selected brand
        const filteredProducts = allProducts.filter(
  (product) =>
    product.brand?.toLowerCase() === brandName?.toLowerCase()
);

        setProducts(filteredProducts);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [brandName]);

  // Loading
  if (loading) {
    return (
      <div className="bg-[#111] text-[#d4af37] text-center py-20">
        Loading Products...
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
    <section className="bg-[#111] text-white min-h-screen py-20 px-6 md:px-16">
      <div className="container mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[#d4af37] tracking-[5px] text-sm mb-4">
            EXPLORE THE COLLECTION
          </p>

          <h1 className="text-3xl md:text-5xl font-bold">
            {brandName} <span className="text-[#d4af37]">WATCHES</span>
          </h1>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <p className="text-center text-gray-400">
            No products found for this brand.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-[#1a1a1a] overflow-hidden group block"
              >
                {/* Image */}
                <div className="h-64 bg-white overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <p className="text-[#d4af37] text-sm">
                    {product.brand}
                  </p>

                  <h2 className="text-lg font-semibold mt-2">
                    {product.title}
                  </h2>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[#d4af37] font-bold text-lg">
                      ${product.price}
                    </span>

                    <span className="text-gray-400">
                      ⭐ {product.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default BrandProducts;