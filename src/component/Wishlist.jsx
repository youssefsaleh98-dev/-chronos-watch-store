
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";

import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
      })
    );
  };

  return (
    <section className="min-h-screen bg-[#111] text-white py-20 px-6 md:px-16">
      <div className="container mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <FiHeart className="text-[#d4af37] text-5xl mx-auto mb-5" />

          <h1 className="text-4xl md:text-5xl font-bold">
            MY <span className="text-[#d4af37]">WISHLIST</span>
          </h1>

          <p className="text-gray-400 mt-4">
            Your favorite watches, all in one place.
          </p>
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-[#1a1a1a]">
            <FiHeart className="text-gray-600 text-6xl mx-auto mb-6" />

            <h2 className="text-2xl font-bold mb-3">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-400 mb-8">
              You haven't added any watches to your wishlist yet.
            </p>

            <Link
              to="/shop"
              className="inline-block bg-[#d4af37] text-black px-8 py-3 font-bold hover:bg-white transition"
            >
              Explore Watches
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist Count */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-400">
                You have{" "}
                <span className="text-[#d4af37] font-bold">
                  {wishlist.length}
                </span>{" "}
                favorite watches
              </p>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="relative group bg-[#1a1a1a] border border-gray-800 hover:border-[#d4af37] transition"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      dispatch(removeFromWishlist(product.id))
                    }
                    title="Remove from Wishlist"
                    className="absolute top-4 right-4 z-10 bg-black/70 text-red-500 p-3 rounded-full hover:bg-red-500 hover:text-white transition"
                  >
                    <FiTrash2 size={18} />
                  </button>

                  {/* Product Image */}
                  <Link to={`/product/${product.id}`}>
                    <div className="bg-white h-64 overflow-hidden">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain p-5 group-hover:scale-110 transition duration-500"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-5">
                    <p className="text-[#d4af37] text-xs uppercase tracking-widest">
                      {product.brand || "CHRONOS"}
                    </p>

                    <Link to={`/product/${product.id}`}>
                      <h2 className="font-semibold text-lg mt-2 hover:text-[#d4af37] transition">
                        {product.title}
                      </h2>
                    </Link>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[#d4af37] text-xl font-bold">
                        ${product.price}
                      </span>

                      <span className="text-gray-400 text-sm">
                        ⭐ {product.rating}
                      </span>
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full mt-5 flex items-center justify-center gap-2 bg-[#d4af37] text-black py-3 font-bold hover:bg-white transition"
                    >
                      <FiShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
