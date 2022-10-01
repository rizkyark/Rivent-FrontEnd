import React from "react";
import "./signup.css";
import eye from "../../assets/img/eye.svg";

export default function Signup() {
  return (
    <>
      <div className="container-fluid">
        <div className="row vh-100">
          {/* Banner */}
          <div className="col-7 banner">
            <img
              src={require("../../assets/img/people.png")}
              alt=""
              className="banner__icon"
            />
          </div>
          {/* Form */}
          <div className="col form__sign-in">
            <div className="container" style={{ padding: "0px" }}>
              <img
                src={require("../../assets/img/riven_logo.png")}
                alt=""
                className="riven__logo"
              />
              <h1 className="form__sign-in--tittle">Sign Up</h1>
              <p className="form__sign-in--desc">
                Already have an account? <a href="./signIn.html">Log In</a>
              </p>
              <form>
                <div className="input__username">
                  <input
                    type="username"
                    className="form-control input__form"
                    id="username"
                    placeholder="Username"
                  />
                </div>
                <div className="input__email">
                  <input
                    type="email"
                    className="form-control input__form"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="input__password">
                  <div className="d-flex position-relative">
                    <input
                      type="password"
                      className="form-control input__form"
                      id="password"
                      placeholder="Password"
                    />
                    <span className="show__password">
                      <button className="btn btn-default reveal" type="button">
                        <img src={eye} alt="" />
                      </button>
                    </span>
                  </div>
                </div>
                <div className="input__password">
                  <div className="d-flex position-relative">
                    <input
                      type="password"
                      className="form-control input__form"
                      id="password"
                      placeholder="Confirm Password"
                    />
                    <span className="show__password">
                      <button className="btn btn-default reveal" type="button">
                        <img src={eye} alt="" />
                      </button>
                    </span>
                  </div>
                </div>
                <div className="d-flex accept_terms">
                  <button className="btn">
                    <img
                      src={require("../../assets/img/checkbox.png")}
                      alt=""
                    />
                  </button>
                  <p>Accept terms and condition</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100 btn__sign-in"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
