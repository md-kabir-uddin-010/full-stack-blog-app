import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

export default function Layout({ children }) {
  return (
    <div className="bg-[#FAFAFA] ">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
