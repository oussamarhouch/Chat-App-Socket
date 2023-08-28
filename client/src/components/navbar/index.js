import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Navbar.css";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = async () => {
    const api = "http://localhost:5000";
    try {
      const response = await fetch(api + "/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(false);
        localStorage.removeItem("userId");

        navigate("/signin");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <div className="navbar">
      <h1>Navbar</h1>
      {localStorage.getItem("userId") != null && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Navbar;
