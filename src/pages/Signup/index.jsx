import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import "./signup.css";
import eye from "../../assets/img/eye.svg";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // console.log(form);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const resultSignup = await axios.post("api/auth/register", form);

      setIsError(false);
      setMessage(resultSignup.data.msg);
      navigate("/signin");
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };
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
            </div>
            {!message ? null : isError ? (
              <div className="alert alert-danger py-2" role="alert">
                {message}
              </div>
            ) : (
              <div className="alert alert-success py-2" role="alert">
                {message}
              </div>
            )}
            <h1 className="form__sign-in--tittle">Sign Up</h1>
            <p className="form__sign-in--desc">
              Already have an account? <a href="./signIn.html">Log In</a>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input__username">
                <input
                  type="username"
                  className="form-control input__form"
                  id="username"
                  name="username"
                  placeholder="Username"
                  onChange={handleChangeForm}
                />
              </div>
              <div className="input__email">
                <input
                  type="email"
                  className="form-control input__form"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChangeForm}
                />
              </div>
              <div className="input__password">
                <div className="d-flex position-relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    className="form-control input__form"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChangeForm}
                  />
                  <span className="show__password">
                    <button
                      className="btn btn-default reveal"
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                    >
                      <img src={eye} alt="" />
                    </button>
                  </span>
                </div>
              </div>
              {/* <div className="input__password">
                <div className="d-flex position-relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    className="form-control input__form"
                    id="password"
                    placeholder="Confirm Password"
                    onChange={handleChangeForm}
                  />
                  <span className="show__password">
                    <button
                      className="btn btn-default reveal"
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                    >
                      <img src={eye} alt="" />
                    </button>
                  </span>
                </div>
              </div> */}
              <div className="d-flex accept_terms">
                <button className="btn">
                  <img src={require("../../assets/img/checkbox.png")} alt="" />
                </button>
                <p>Accept terms and condition</p>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 btn__sign-in"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
