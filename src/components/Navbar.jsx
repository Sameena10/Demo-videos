import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logocc from "../assets/CC.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logocc} alt="Logo" className="navbar-logo" />
      </div>

      <div className="navbar-center">
        <h1 className="navbar-title"></h1>
      </div>
    </nav>
  );
};

export default Navbar;
