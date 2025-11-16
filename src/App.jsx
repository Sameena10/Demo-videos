import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import LoginPage from "./components/Login";
import VideoDashboard from "./components/Video";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              <Navbar />
              <main className="main-content page-container">
                <HomePage token={token} />
              </main>
            </div>
          }
        />

        <Route
          path="/login"
          element={<LoginPage setToken={setToken} />}
        />

        <Route
          path="/dashboard"
          element={
            token ? (
              <div className="app-container">
                {/* <Navbar /> */}
                <main className="main-content page-container">
                  <VideoDashboard />
                </main>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
