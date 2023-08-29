import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/SignIn.css";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const api = "http://localhost:5000";

    try {
      const response = await axios.post(
        api + "/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem("userId", response.data.userId);
        navigate("/chat");
      } else {
        console.error("Login not successful:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signin">
      <form className="login-form">
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />

        <button className="buttonForm" onClick={handleLogin}>
          Log In
        </button>
        <div className="social">
          Don't have one.
          <div className="go" onClick={() => navigate("/signup")} S>
            <i className="fab fa-google"></i>
            Sign Up
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
