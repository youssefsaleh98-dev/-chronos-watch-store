
import React from "react";
import Hero from "../component/Hero";
import Collections from "../component/Collections";
import WhyChooseUs from "./WhyChooseUs";
import Brands from "./Brands";
import Footer from "./Footer"
const Home = () => {
  return (
    <>
      <Hero />
      <Collections 
       title="MEN'S WATCHES"
    category="mens-watches" />
    <Collections title="WOMEN'S WATCHES"
    category="womens-watches" />
    <Brands />
    <WhyChooseUs />
    <Footer />
    </>
  );
};

export default Home;
