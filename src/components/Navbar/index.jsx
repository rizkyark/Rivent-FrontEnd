/* eslint-disable no-console */
import React from "react";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/img/riven_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../stores/action/user";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataUser = useSelector((state) => state.user.data);
  const refreshToken = localStorage.getItem("refreshToken");
  // const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  // eslint-disable-next-line no-console
  // console.log(dataUser.username);

  const handleLogout = async () => {
    try {
      await dispatch(logout(refreshToken));
      localStorage.clear();
      navigate("/");
      // window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
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
            {Object.keys(dataUser).length === 0 ? (
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
                      <Link className="dropdown-item" to="/update-profile">
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
