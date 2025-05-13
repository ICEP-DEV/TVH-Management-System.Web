import React, { useState } from "react";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../api";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/auth/signin", { email, password });
      const { token, role, id } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        if (role === "Organize" || role === "Admin") {
          navigate("/homepage");
        } else {
          navigate("/userpage");
        }
      }, 1000);
    } catch (error) {
      console.error("Login error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="content" style={styles.content}>
      <h1 className="text-center mb-4">Sign In</h1>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3 position-relative">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`bi toggle-icon ${
              showPassword ? "bi-eye" : "bi-eye-slash"
            }`}
            onClick={handleTogglePassword}
            style={styles.icon}
          />
          <div className="forgot-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Sign In
        </button>
      </form>

      {/* Toast Notification */}
      {showToast && (
        <div
          className="toast-container position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 9999 }}
        >
          <div
            className="toast show align-items-center text-bg-success border-0"
            role="alert"
          >
            <div className="d-flex">
              <div className="toast-body">✅ Sign In Successful!</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;

const styles = {
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "black",
    padding: "40px",
    maxWidth: "450px",
    margin: "8% auto",
    borderRadius: "10px",
  },
  icon: {
    position: "absolute",
    right: "15px",
    top: "35px",
    cursor: "pointer",
    color: "#6c757d",
  },
};
