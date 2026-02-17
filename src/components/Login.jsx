import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsernameState] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  
  /*
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    try {
      const res = await axios.post(
        "https://backend-demo-1-eucp.onrender.com/api/login",
        { username, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed");
    }
  };
  */

  return (
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

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
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
  },
  title: {
    fontSize: "26px",
  },
  subtitle: {
    marginBottom: "25px",
    color: "#777",
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
  },
  button: {
    padding: "12px",
    marginTop: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Login;
