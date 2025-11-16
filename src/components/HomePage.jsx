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
          From <span className="highlight">Clues</span> to <span className="highlight">Insights</span> – Fast.
        </h1>
        <p className="hero-subtitle">
          An all-in-one investigative platform that empowers professionals to uncover critical intelligence in minutes, not hours.
        </p>
        <button className="demo-btn" onClick={handleDemoClick}>
          Login
        </button>
      </div>

      {/* <div className="users-section">
        <h2>Who can benefit</h2>
        <div className="users-list">
          {users.map((user, index) => (
            <div key={index} className="user-card">
              {user}
            </div>
          ))}
        </div>
      </div> */}

      <div className="features-section">
        <h2>Capabilities</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              {feature}
            </div>
          ))}
        </div>
      </div>
       <Footer />
    </div>
  );
};

export default HomePage;
