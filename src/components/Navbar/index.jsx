import React from "react";
import "./navbar.css";
import logo from "../../assets/img/riven_logo.png";

export default function Navbar() {
  return (
    <>
      {/* <!-- Navbar --> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid navbar__container">
          <a className="navbar__logo" href="./home.html">
            <img src={logo} alt="riven" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link menu"
                  aria-current="page"
                  href="./home.html"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link menu" href="./home.html">
                  Create Events
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link menu" href="./home.html">
                  Location
                </a>
              </li>
            </ul>
            <a className="btn btn__signin" href="./signIn.html" role="button">
              Log In
            </a>
            <a
              className="btn btn-primary btn__signup"
              href="./signUp.html"
              role="button"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
