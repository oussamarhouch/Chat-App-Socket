import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/SignUp.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const api = "http://localhost:5000";

    try {
      const response = await axios.post(
        api + "/register",
        {
          username,
          email,
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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="SignUp">
      <form className="register-form">
        <h3>Register Here</h3>
        <label htmlFor="username">Email</label>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="username"
        />

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

        <button className="buttonForm" onClick={handleRegister}>
          Register
        </button>
        <div className="social">
          Already have one
          <div className="go-register" onClick={() => navigate("/signin")} S>
            <i className="fab fa-google"></i>
            Sign In
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
