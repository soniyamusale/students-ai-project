import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!emailRegex.test(input) && !phoneRegex.test(input)) {
      setMessage("Enter valid email or phone number");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setMessage("");

    alert("Login Successful ✅");

    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Student AI App</h1>

        <p className="subtitle">
          
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Email or Phone"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            className="input"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="input"
          />

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

          {message && (
            <p className="message">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;