import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
       "https://backend-demo-1-eucp.onrender.com/api/login",
        {
          username,
          password,
        }
      );

      // Store token
      localStorage.setItem("token", res.data.token);
      if (setToken) setToken(res.data.token);

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 1500,
        className: "toast-success",
        closeButton: false, 
      });

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.", {
        position: "top-center",
        autoClose: 2000,
        className: "toast-error",
        closeButton: false, // remove X button
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        limit={1}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        toastStyle={{
          fontSize: "16px",
          padding: "12px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "380px",
        }}
      />

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
              onChange={(e) => setUsername(e.target.value)}
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

      <style>{`
        .Toastify__toast-body {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .Toastify__toast {
          width: auto !important;
          max-width: 380px;
        }

        .toast-success {
          border: 2px solid #2ecc71;
          background: #eafff3;
          color: #1e8f57;
          font-weight: bold;
        }

        .toast-error {
          border: 2px solid #e74c3c;
          background: #ffecec;
          color: #b42318;
          font-weight: bold;
        }

        @media (max-width: 480px) {
          .Toastify__toast {
            width: 90%;
            margin: auto;
          }
        }
      `}</style>
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
