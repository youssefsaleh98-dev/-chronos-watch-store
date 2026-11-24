
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";
import { FiHeart } from "react-icons/fi";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist?.items || []
  );

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  const isInWishlist = wishlist.some(
    (item) => item.id === product?.id
  );

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  if (loading) {
    return (
      <div className="bg-[#111] text-[#d4af37] text-center py-32">
        Loading Product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-[#111] text-red-500 text-center py-32">
        {error || "Product not found"}
      </div>
    );
  }

  return (
    <section className="bg-[#111] text-white min-h-screen py-20 px-6 md:px-16">
      <div className="container mx-auto">
        <Link to="/" className="text-[#d4af37] mb-10 inline-block">
          ← Back to Home
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Product Images */}
          <div>
            <div className="bg-white h-[400px] flex items-center justify-center">
              <img
                src={selectedImage}
                alt={product.title}
                className="h-full w-full object-contain p-8"
              />
            </div>

            <div className="flex gap-4 mt-5 flex-wrap">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`bg-white w-20 h-20 border-2 ${
                    selectedImage === image
                      ? "border-[#d4af37]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            <p className="text-[#d4af37] tracking-[4px] uppercase">
              {product.brand || "CHRONOS COLLECTION"}
            </p>

            <h1 className="text-3xl md:text-5xl font-bold mt-4">
              {product.title}
            </h1>

            <p className="text-gray-400 mt-6 leading-7">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <span className="text-3xl text-[#d4af37] font-bold">
                ${product.price}
              </span>

              <span className="text-gray-400">
                ⭐ {product.rating}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-5 mt-8">
              <span>Quantity:</span>

              <div className="flex items-center border border-gray-600">
                <button
                  onClick={() =>
                    setQuantity((prev) => Math.max(1, prev - 1))
                  }
                  className="px-4 py-2"
                >
                  -
                </button>

                <span className="px-4">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-4 py-2"
                >
                  +
                </button>
              </div>
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className={`mt-8 w-full border py-4 font-bold flex items-center justify-center gap-3 transition ${
                isInWishlist
                  ? "border-[#d4af37] text-[#d4af37]"
                  : "border-gray-600 text-white hover:border-[#d4af37] hover:text-[#d4af37]"
              }`}
            >
              <FiHeart
                size={20}
                fill={isInWishlist ? "currentColor" : "none"}
              />

              {isInWishlist
                ? "REMOVE FROM WISHLIST"
                : "ADD TO WISHLIST"}
            </button>

            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              className="mt-4 w-full bg-[#d4af37] text-black py-4 font-bold hover:bg-white transition"
            >
              ADD TO CART
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
