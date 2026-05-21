import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import "../Dashboard.css";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    if (!email || !password) {

      alert("Please enter all fields");

      return;

    }

    // SAVE LOGIN STATUS

   localStorage.setItem(
  "isLoggedIn",
  "true"
);

// POPUP MESSAGE

alert("Login Successfully");

navigate("/dashboard");
  };

  return (

    <div className="login-page">

      <div className="login-box">

       

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="login-input"
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="login-input"
          />

          {/* BUTTON */}

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default LoginPage;