
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch, FiHeart } from "react-icons/fi";

import { toggleWishlist } from "../redux/wishlistSlice";

const Shop = ({ pageTitle = "Shop Watches", onlyCategory = "all" }) => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Wishlist from Redux
  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

  // Search and category
  const [search, setSearch] = useState(
    () => searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(onlyCategory);
  const [sort, setSort] = useState("default");

  // Sidebar filters
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);

  // Sync search with Navbar URL search
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // Fetch products
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError("");

        let fetchedProducts = [];

        if (onlyCategory === "men") {
          const response = await fetch(
            "https://dummyjson.com/products/category/mens-watches?limit=100"
          );

          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }

          const data = await response.json();
          fetchedProducts = data.products;
        } else if (onlyCategory === "women") {
          const response = await fetch(
            "https://dummyjson.com/products/category/womens-watches?limit=100"
          );

          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }

          const data = await response.json();
          fetchedProducts = data.products;
        } else {
          const [menResponse, womenResponse] = await Promise.all([
            fetch(
              "https://dummyjson.com/products/category/mens-watches?limit=100"
            ),
            fetch(
              "https://dummyjson.com/products/category/womens-watches?limit=100"
            ),
          ]);

          if (!menResponse.ok || !womenResponse.ok) {
            throw new Error("Failed to fetch products");
          }

          const menData = await menResponse.json();
          const womenData = await womenResponse.json();

          fetchedProducts = [
            ...menData.products,
            ...womenData.products,
          ];
        }

        setProducts(fetchedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [onlyCategory]);

  // Get unique brands
  const brands = [
    ...new Set(
      products.map((product) => product.brand).filter(Boolean)
    ),
  ];

  // Select and remove brands
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
  };

  // Toggle wishlist
  const handleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(toggleWishlist(product));
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setCategory(onlyCategory);
    setSort("default");
    setMinPrice(0);
    setMaxPrice(2000);
    setSelectedBrands([]);
    setMinRating(0);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => {
      if (category === "all") return true;

      if (category === "men") {
        return product.category === "mens-watches";
      }

      if (category === "women") {
        return product.category === "womens-watches";
      }

      return true;
    })
    .filter(
      (product) =>
        product.price >= minPrice && product.price <= maxPrice
    )
    .filter((product) =>
      selectedBrands.length === 0
        ? true
        : selectedBrands.includes(product.brand)
    )
    .filter((product) => product.rating >= minRating)
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center text-[#d4af37] text-xl">
        Loading Watches...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#111] text-white px-6 md:px-16 py-16">

      {/* Page Header */}
      <div className="text-center mb-14">
        <p className="text-[#d4af37] tracking-[5px] uppercase">
          Discover Our Collection
        </p>

        <h1 className="text-4xl md:text-6xl font-bold mt-4">
          {pageTitle}
        </h1>

        <p className="text-gray-400 mt-4">
          Find the perfect watch that matches your style.
        </p>
      </div>

      {/* Search and Top Filters */}
      <div className="flex flex-col md:flex-row gap-5 justify-between mb-10">

        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search watches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1c1c1c] border border-gray-700 py-3 pl-12 pr-4 outline-none focus:border-[#d4af37]"
          />
        </div>

        {/* Category */}
        {onlyCategory === "all" && (
          <div className="flex gap-3 flex-wrap">
            {["all", "men", "women"].map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-6 py-3 border uppercase text-sm transition ${
                  category === item
                    ? "bg-[#d4af37] text-black border-[#d4af37]"
                    : "border-gray-700 text-white hover:border-[#d4af37]"
                }`}
              >
                {item === "all" ? "All Watches" : item}
              </button>
            ))}
          </div>
        )}

        {/* Sorting */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-[#1c1c1c] border border-gray-700 px-4 py-3 outline-none focus:border-[#d4af37]"
        >
          <option value="default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Sidebar and Products */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">

        {/* Sidebar */}
        <aside className="bg-[#1a1a1a] border border-gray-800 p-6 h-fit">

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Filters</h2>

            <button
              onClick={clearFilters}
              className="text-[#d4af37] text-sm hover:text-white"
            >
              Clear All
            </button>
          </div>

          {/* Price Filter */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Price Range</h3>

            <div className="flex justify-between text-sm text-gray-400 mb-3">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>

            <input
              type="range"
              min="0"
              max="2000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#d4af37]"
            />
          </div>

          <hr className="border-gray-700 mb-8" />

          {/* Brand Filter */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Brands</h3>

            <div className="flex flex-col gap-3 max-h-52 overflow-y-auto">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 text-gray-400 cursor-pointer hover:text-[#d4af37]"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="accent-[#d4af37]"
                  />

                  {brand}
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-700 mb-8" />

          {/* Rating Filter */}
          <div>
            <h3 className="font-semibold mb-4">
              Minimum Rating
            </h3>

            {[0, 3, 4, 4.5].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-3 mb-3 text-gray-400 cursor-pointer hover:text-[#d4af37]"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === rating}
                  onChange={() => setMinRating(rating)}
                  className="accent-[#d4af37]"
                />

                {rating === 0 ? "All Ratings" : `${rating}+ ⭐`}
              </label>
            ))}
          </div>
        </aside>

        {/* Products */}
        <div>
          <p className="text-gray-400 mb-6">
            Showing {filteredProducts.length} watches
          </p>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-400 py-20">
              No watches found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative group bg-[#1a1a1a] overflow-hidden border border-transparent hover:border-[#d4af37] transition"
                >
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => handleWishlist(e, product)}
                    title={
                      isInWishlist(product.id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"
                    }
                    className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition ${
                      isInWishlist(product.id)
                        ? "bg-[#d4af37] text-black"
                        : "bg-black/70 text-white hover:bg-[#d4af37] hover:text-black"
                    }`}
                  >
                    <FiHeart
                      size={20}
                      fill={
                        isInWishlist(product.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>

                  {/* Product Link */}
                  <Link to={`/product/${product.id}`}>

                    {/* Image */}
                    <div className="bg-white h-64 overflow-hidden">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain p-5 group-hover:scale-110 transition duration-500"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <p className="text-[#d4af37] text-xs uppercase tracking-widest">
                        {product.brand || "CHRONOS"}
                      </p>

                      <h2 className="text-lg font-semibold mt-2">
                        {product.title}
                      </h2>

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-[#d4af37] text-xl font-bold">
                          ${product.price}
                        </span>

                        <span className="text-gray-400 text-sm">
                          ⭐ {product.rating}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Shop;
