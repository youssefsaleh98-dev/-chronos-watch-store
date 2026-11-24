
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Brands from "./component/Brands";
import Login from "./component/Login"
import Register from "./component/Register"
import BrandProducts from "./component/BrandProducts"
import ProductDetails from "./component/ProductDetails";
import Cart from "./component/Cart";
import Shop from "./component/Shop";
import Men from "./component/Men";
import Woman from "./component/Woman";
import About from "./component/About";
import Checkout from "./component/Checkout";
import ProtectedRoute from "./component/ProtectedRoute";
import Wishlist from "./component/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/login" element={<Login />} />
        <Route path="/brands/:brandName" element={<BrandProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Woman />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route element={<ProtectedRoute />}>
  <Route path="/checkout" element={<Checkout />} />
</Route>
<Route path="/wishlist" element={<Wishlist />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
