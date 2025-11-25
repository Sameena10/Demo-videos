import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Footer from "./Footer";

const HomePage = () => {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    navigate("/login");
  };

  const users = [
    "Beginner Analysts",
    "Advanced OSINT Specialists",
    "Cyber Investigators",
  ];

  const features = [
    "Live social media intelligence",
    "Initial background checks on subjects",
    "Advanced network link mapping",
    "Securely archive investigative evidence",
    "Centralized case management",
    "Audit-ready operations tracking",
    "Instant access to multiple data sources",
    "Tailored technical support",
  ];

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">
          From <span className="highlight">Clue</span> to <span className="highlight">Closure</span> – Fast.
        </h1>
        <p className="hero-subtitle">
          An all-in-one OSINT platform that empowers investigators to uncover critical intelligence.

        </p>
        <button className="demo-btn" onClick={handleDemoClick}>
          Login
        </button>
        <p className="hero-subtitle">
        Log in to master the system and learn to derive intelligence effectively.
          
        </p>
      </div>
    </div>
      //  <Footer />
  );
};

export default HomePage;
