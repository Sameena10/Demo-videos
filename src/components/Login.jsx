import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setToken }) => {
  const [username, setUsernameState] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // FRONTEND VALIDATION
  const validateFields = () => {
    if (!username.trim()) {
      toast.error("Username is required.", { position: "top-center" });
      return false;
    }
    if (username.trim().length < 3) {
      toast.error("Username must be at least 3 characters.", {
        position: "top-center",
      });
      return false;
    }
    if (!password.trim()) {
      toast.error("Password is required.", { position: "top-center" });
      return false;
    }
    if (password.trim().length < 4) {
      toast.error("Password must be at least 4 characters.", {
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "https://backend-demo-1-eucp.onrender.com/api/login",
        { username, password }
      );

      // 1️⃣ Save token
      localStorage.setItem("token", res.data.token);
      if (setToken) setToken(res.data.token);

      // 2️⃣ Save username (THIS FIXES DEMO TRAINING ISSUE)
      localStorage.setItem("username", username);

      // 3️⃣ Updated module list to match your sidebar
      const allowedModules = [
        "System Login",
        "Case Management",
        "Target Management",
        "PII Search",
        "Reports",
        "Administration & Settings",
        "Ad-hoc Search",
      ];

      // 4️⃣ Give Demo Training only to demo_user
      if (username.trim().toLowerCase().includes("demo")) {
        allowedModules.push("Demo Training");
      }

      // 5️⃣ Save allowed modules
      localStorage.setItem("allowedModules", JSON.stringify(allowedModules));

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 1500,
      });

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid username or password.",
        {
          position: "top-center",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" limit={1} newestOnTop={true} />

      <div style={styles.container}>
        <div style={styles.card}>
          <button style={styles.closeBtn} onClick={() => navigate("/")}>
            ✕
          </button>

          <h2 style={styles.title}>LOGIN</h2>
          <p style={styles.subtitle}>Access your dashboard</p>

          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsernameState(e.target.value)}
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "380px",
    position: "relative",
    textAlign: "center",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "12px",
    border: "none",
    background: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "#555",
  },
  title: {
    margin: "0 0 10px",
    color: "#333",
    fontSize: "26px",
  },
  subtitle: {
    margin: "0 0 25px",
    color: "#777",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  button: {
    padding: "12px",
    marginTop: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Login;
