
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const { user, logout, authLoading } = useAuth();

  // Cart
  const cart = useSelector((state) => state.cart.items);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Wishlist
  const wishlist = useSelector(
    (state) => state.wishlist?.items || []
  );

  const wishlistCount = wishlist.length;

  const links = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
    { name: "MEN", path: "/men" },
    { name: "WOMEN", path: "/women" },
    { name: "BRANDS", path: "/brands" },
    { name: "ABOUT", path: "/about" },
  ];

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);

    setSearchTerm("");
    setSearchOpen(false);
    setMenuOpen(false);
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-[#111] text-white border-b border-[#d4af37]/20 relative z-50">
      <div className="container mx-auto px-6 md:px-16">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-3xl font-bold tracking-widest">
            CHRONOS<span className="text-[#d4af37]">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm tracking-wider transition ${
                    isActive
                      ? "text-[#d4af37]"
                      : "text-gray-300 hover:text-[#d4af37]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:block hover:text-[#d4af37] transition"
              title="Search"
            >
              {searchOpen ? (
                <FiX size={21} />
              ) : (
                <FiSearch size={21} />
              )}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative hidden sm:block hover:text-[#d4af37] transition"
              title="Wishlist"
            >
              <FiHeart size={21} />

              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#d4af37] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative hover:text-[#d4af37] transition"
              title="Cart"
            >
              <FiShoppingBag size={22} />

              <span className="absolute -top-2 -right-3 bg-[#d4af37] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>

            {/* User Authentication */}
            {!authLoading && (
              user ? (
                <div className="hidden sm:flex items-center gap-3">
                  <span className="text-sm text-[#d4af37] max-w-28 truncate">
                    {user.displayName || user.email}
                  </span>

                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="hover:text-[#d4af37] transition"
                  >
                    <FiLogOut size={21} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:block hover:text-[#d4af37]"
                >
                  <FiUser size={22} />
                </Link>
              )
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-[#d4af37]"
            >
              {menuOpen ? <FiX size={25} /> : <FiMenu size={25} />}
            </button>
          </div>
        </div>

        {/* Search Input */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center gap-3 pb-5"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for watches..."
              autoFocus
              className="w-full bg-[#1a1a1a] border border-gray-700 px-5 py-3 outline-none focus:border-[#d4af37] text-white"
            />

            <button
              type="submit"
              className="bg-[#d4af37] text-black px-6 py-3 font-bold hover:bg-white transition"
            >
              Search
            </button>
          </form>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden flex flex-col gap-5 pb-6">

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search watches..."
                className="min-w-0 flex-1 bg-[#1a1a1a] border border-gray-700 px-4 py-3 outline-none focus:border-[#d4af37]"
              />

              <button
                type="submit"
                className="bg-[#d4af37] text-black px-4"
              >
                <FiSearch size={20} />
              </button>
            </form>

            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#d4af37]"
                    : "text-gray-300 hover:text-[#d4af37]"
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-gray-300 hover:text-[#d4af37]"
            >
              <FiHeart />
              Wishlist ({wishlistCount})
            </Link>

            {!authLoading && (
              user ? (
                <div className="flex flex-col gap-3 border-t border-gray-700 pt-4">
                  <span className="text-[#d4af37]">
                    Welcome {user.displayName || user.email}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-left text-gray-300 hover:text-[#d4af37]"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:text-[#d4af37]"
                >
                  LOGIN / REGISTER
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
