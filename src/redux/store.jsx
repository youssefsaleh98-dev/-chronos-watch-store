
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

// Get saved data from localStorage
const loadState = () => {
  try {
    const cart = localStorage.getItem("cart");
    const wishlist = localStorage.getItem("wishlist");

    return {
      cart: cart ? JSON.parse(cart) : { items: [] },
      wishlist: wishlist
        ? JSON.parse(wishlist)
        : { items: [] },
    };
  } catch (error) {
    console.error("Error loading data:", error);

    return {
      cart: { items: [] },
      wishlist: { items: [] },
    };
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },

  preloadedState: loadState(),
});

// Save data whenever Redux state changes
store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem("cart", JSON.stringify(state.cart));
  localStorage.setItem(
    "wishlist",
    JSON.stringify(state.wishlist)
  );
});
