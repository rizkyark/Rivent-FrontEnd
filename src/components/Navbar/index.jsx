import React from "react";
import "./navbar.css";
import logo from "../../assets/img/riven_logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  // eslint-disable-next-line no-console
  // console.log(dataUser.username);

  const handleLogout = () => {
    localStorage.clear("dataUser");
    window.location.reload(false);
  };
  return (
    <>
      {/* <!-- Navbar --> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid navbar__container">
          <Link className="navbar__logo" to={"/"}>
            <img src={logo} alt="riven" />
          </Link>
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
            {!localStorage.getItem("datauser") ? (
              <>
                <Link className="btn btn__signin" to={"/signin"} role="button">
                  Log In
                </Link>
                <Link
                  className="btn btn-primary btn__signup"
                  to={"/signup"}
                  role="button"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className={"d-flex align-items-center"}>
                <div className="dropdown ms-5">
                  <button
                    type="button"
                    className="bg-transparent border-0"
                    id="dropdownProfileMenu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-offset="0,20"
                  >
                    <img
                      src={
                        dataUser.imagePath
                          ? dataUser.imagePath
                          : `https://ui-avatars.com/api/?name=${dataUser.username}&background=random&size=44`
                      }
                      alt="profile"
                      className="rounded-circle"
                      style={{ width: "44px" }}
                    />
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end rounded-3"
                    aria-labelledby="dropdownProfileMenu"
                  >
                    <li>
                      <Link className="dropdown-item" to="/signin">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
                <p className="navbar__username">{dataUser.username}</p>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
