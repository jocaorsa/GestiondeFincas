import React from "react";
import Header from "../src/Pages/Header/Header";
import Footer from "../src/Pages/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./index.css";

function Root() {
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
