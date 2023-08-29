import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../../assets/css/Navbar.css";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("userId") !== null);
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
      <div>
        <section className="header">
          <nav className="nav">
            <a onClick={() => navigate("/")} className="nav_logo">
              ChatApp
            </a>

            <ul className="nav_items">
              <li className="nav_item">
                <a onClick={() => navigate("/")} className="nav_link">
                  Home
                </a>
                <a onClick={() => navigate("/")} className="nav_link">
                  Product
                </a>
                <a onClick={() => navigate("/")} className="nav_link">
                  Services
                </a>
                <a onClick={() => navigate("/")} className="nav_link">
                  Contact
                </a>
              </li>
            </ul>

            {isAuthenticated ? (
              <button className="button" id="form-open" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button
                className="button"
                id="form-open"
                onClick={() => navigate("/signin")}
              >
                Login
              </button>
            )}
          </nav>
        </section>
      </div>
    </div>
  );
}

export default Navbar;
