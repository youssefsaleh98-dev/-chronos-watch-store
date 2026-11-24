
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useAuth();
  const cart = useSelector((state) => state.cart.items);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo checkout: no real order is sent to a server
    setOrderPlaced(true);
    dispatch(clearCart());
  };

  if (orderPlaced) {
    return (
      <section className="min-h-screen bg-[#111] text-white flex items-center justify-center px-6">
        <div className="text-center bg-[#1a1a1a] p-10 max-w-lg w-full">
          <div className="text-[#d4af37] text-6xl mb-5">✓</div>

          <h1 className="text-3xl font-bold mb-4">
            Order <span className="text-[#d4af37]">Placed!</span>
          </h1>

          <p className="text-gray-400 mb-8">
            Thank you for shopping with CHRONOS.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-[#d4af37] text-black px-8 py-3 font-bold hover:bg-white transition"
          >
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="min-h-screen bg-[#111] text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">
          Your cart is empty
        </h1>

        <Link
          to="/shop"
          className="bg-[#d4af37] text-black px-8 py-3 font-bold"
        >
          Go Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#111] text-white py-20 px-6 md:px-16">
      <div className="container mx-auto">

        <h1 className="text-4xl font-bold mb-12">
          CHECK <span className="text-[#d4af37]">OUT</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Customer Information */}
          <div className="lg:col-span-2">

            <form onSubmit={handleSubmit}>

              <h2 className="text-2xl font-bold mb-6">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-[#1a1a1a] border border-gray-700 p-4 outline-none focus:border-[#d4af37]"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[#1a1a1a] border border-gray-700 p-4 outline-none focus:border-[#d4af37]"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-[#1a1a1a] border border-gray-700 p-4 outline-none focus:border-[#d4af37]"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="bg-[#1a1a1a] border border-gray-700 p-4 outline-none focus:border-[#d4af37]"
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Full Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="bg-[#1a1a1a] border border-gray-700 p-4 outline-none focus:border-[#d4af37] md:col-span-2"
                />

                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="bg-[#1a1a1a] border border-gray-700 p-4 outline-none focus:border-[#d4af37]"
                />

              </div>

              {/* Payment Method */}
              <h2 className="text-2xl font-bold mt-10 mb-6">
                Payment Method
              </h2>

              <div className="bg-[#1a1a1a] border border-[#d4af37] p-5">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked
                    readOnly
                  />

                  <span>Cash on Delivery</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-8 bg-[#d4af37] text-black py-4 font-bold text-lg hover:bg-white transition"
              >
                Place Order
              </button>

            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-[#1a1a1a] p-6 h-fit">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-5">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-gray-700 pb-4"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-contain bg-white"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="text-[#d4af37] font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

            </div>

            <div className="flex justify-between mt-6 text-gray-400">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mt-4 text-gray-400">
              <span>Shipping</span>
              <span className="text-green-500">Free</span>
            </div>

            <div className="border-t border-gray-700 mt-6 pt-6 flex justify-between">
              <span className="text-xl font-bold">Total</span>

              <span className="text-xl font-bold text-[#d4af37]">
                ${total.toFixed(2)}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Checkout;
