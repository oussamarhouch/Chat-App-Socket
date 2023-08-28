import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../../assets/css/Navbar.css";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
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

  const handleFormOpen = () => {
    setIsFormVisible(true);
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  const handleTogglePasswordVisibility = () => {
    // Handle password visibility toggling
  };

  return (
    <div className="navbar">
      <div>
        <section className="header">
          <nav className="nav">
            <a href="#" className="nav_logo">
              ChatApp
            </a>

            <ul className="nav_items">
              <li className="nav_item">
                <a href="#" className="nav_link">
                  Home
                </a>
                <a href="#" className="nav_link">
                  Product
                </a>
                <a href="#" className="nav_link">
                  Services
                </a>
                <a href="#" className="nav_link">
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
                onClick={handleFormOpen}
              >
                Login
              </button>
            )}
          </nav>
        </section>
      </div>

      {isFormVisible && (
        <section className="App">
          <CSSTransition
            in={isFormVisible}
            timeout={400}
            classNames="form-transition"
            unmountOnExit
          >
            <div className={`form_container${isFormVisible ? " visible" : ""}`}>
              <i
                className="uil uil-times form_close"
                onClick={handleFormClose}
              ></i>

              <div className="form login_form">
                <form action="#">
                  <h2>Login</h2>

                  <div className="input_box">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                    <i className="uil uil-envelope-alt email"></i>
                  </div>
                  <div className="input_box">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                    <i className="uil uil-lock password"></i>
                    <i
                      className="uil uil-eye-slash pw_hide"
                      onClick={handleTogglePasswordVisibility}
                    ></i>
                  </div>

                  <div className="option_field">
                    <span className="checkbox">
                      <input type="checkbox" id="check" />
                      <label htmlFor="check">Remember me</label>
                    </span>
                    <a href="#" className="forgot_pw">
                      Forgot password?
                    </a>
                  </div>

                  <button className="button">Login Now</button>

                  <div className="login_signup">
                    Don't have an account?{" "}
                    <a href="#" id="signup">
                      Signup
                    </a>
                  </div>
                </form>
              </div>

              {/* Signup Form */}
              <div className="form signup_form">
                <form action="#">
                  <h2>Signup</h2>

                  <div className="input_box">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                    <i className="uil uil-envelope-alt email"></i>
                  </div>
                  <div className="input_box">
                    <input
                      type="password"
                      placeholder="Create password"
                      required
                    />
                    <i className="uil uil-lock password"></i>
                    <i
                      className="uil uil-eye-slash pw_hide"
                      onClick={handleTogglePasswordVisibility}
                    ></i>
                  </div>
                  <div className="input_box">
                    <input
                      type="password"
                      placeholder="Confirm password"
                      required
                    />
                    <i className="uil uil-lock password"></i>
                    <i
                      className="uil uil-eye-slash pw_hide"
                      onClick={handleTogglePasswordVisibility}
                    ></i>
                  </div>

                  <button className="button">Signup Now</button>

                  <div className="login_signup">
                    Already have an account?{" "}
                    <a href="#" id="login">
                      Login
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </CSSTransition>
        </section>
      )}
    </div>
  );
}

export default Navbar;
