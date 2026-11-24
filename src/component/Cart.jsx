
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="bg-[#111] text-white min-h-screen py-20 px-6 md:px-16">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-10">
          SHOPPING <span className="text-[#d4af37]">CART</span>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-6">
              Your cart is empty.
            </p>

            <Link
              to="/shop"
              className="inline-block bg-[#d4af37] text-black px-8 py-3 font-bold hover:bg-white transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center gap-6 bg-[#1a1a1a] p-5"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-contain bg-white"
                  />

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="font-bold">{item.title}</h2>

                    <p className="text-[#d4af37] mt-2">
                      ${item.price}
                    </p>

                    <div className="flex items-center justify-center md:justify-start gap-4 mt-3">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="bg-[#333] px-3 py-1 hover:bg-[#d4af37] hover:text-black transition"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="bg-[#333] px-3 py-1 hover:bg-[#d4af37] hover:text-black transition"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 text-sm mt-3 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="font-bold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-right mt-10">
              <h2 className="text-2xl font-bold">
                Total:{" "}
                <span className="text-[#d4af37]">
                  ${total.toFixed(2)}
                </span>
              </h2>

              <Link
                to="/checkout"
                className="inline-block mt-6 bg-[#d4af37] text-black px-8 py-3 font-bold hover:bg-white transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
