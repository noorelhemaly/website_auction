import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Login failed");
      }

      const data = await response.json();

      if (data.admin === true) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/home");
      } else {
        localStorage.setItem("userToken", data.token);
        navigate("/");
      }

      window.dispatchEvent(new Event("storage")); // Trigger storage event to refresh navbar
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login">
      <form className="loginform" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {message && <p className="error">{message}</p>}
        <p>
          Don't have an account? <a href="/register">Create your account here</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
