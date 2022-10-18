import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { getUserById } from "../../stores/action/user";
import "./signin.css";
import eye from "../../assets/img/eye.svg";
import { login } from "../../stores/action/auth";

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // const [message, setMessage] = useState("");
  // const [isError, setIsError] = useState(false);
  // const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // eslint-disable-next-line no-console
  console.log(form);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await dispatch(login(form))
        .then((res) => {
          console.log(res.value.data.msg);
          // navigate("/");
          // location.reload();
        })
        .catch((err) => alert(err));
      const resultLogin = await axios.post("api/auth/login", form);
      localStorage.setItem("token", resultLogin.data.msg.token);
      localStorage.setItem("refreshToken", resultLogin.data.msg.refreshToken);
      await dispatch(getUserById(resultLogin.data.msg.userId));
      const resultUser = await axios.get(
        `api/user/${resultLogin.data.msg.userId}`
      );
      localStorage.setItem("datauser", JSON.stringify(resultUser.data.data[0]));
      localStorage.setItem(
        "dataUser",
        JSON.stringify({
          id: resultUser.data.data[0].userId,
          role: "admin",
          username: resultUser.data.data[0].username,
          imagePath: resultUser.data.data[0].imagePath,
        })
      );
      // setIsError(false);
      // setMessage(resultLogin.data.status);
      // navigate("/");
      setTimeout(() => {
        navigate("/");
      }, 1500);
      // eslint-disable-next-line no-console
      console.log(resultUser.data.data[0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.response);
      // setIsError(true);
      // setMessage(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row vh-100">
          <div className="col-7 banner">
            <img
              src={require("../../assets/img/people.png")}
              alt=""
              className="banner__icon"
            />
          </div>
          <div className="col form__sign-in">
            <div className="container" style={{ padding: "0px" }}>
              <img
                src={require("../../assets/img/riven_logo.png")}
                alt=""
                className="riven__logo"
              />
              {/* {!message ? null : isError ? (
                <div className="alert alert-danger py-2" role="alert">
                  {message}
                </div>
              ) : (
                <div className="alert alert-success py-2" role="alert">
                  {message}
                </div>
              )} */}
              <h1 className="form__sign-in--tittle">Sign In</h1>
              <p className="form__sign-in--desc">Hi, Welcome back to Riven!</p>
              <form onSubmit={handleSubmit}>
                {/* <div className="input__username">
                  <input
                    type="username"
                    className="form-control input__form"
                    id="username"
                    name="username"
                    placeholder="Username"
                    onChange={handleChangeForm}
                  />
                </div> */}
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
                <p className="forgot__password">
                  <a href="" className="forgot__password--reset">
                    Forgot Password?
                  </a>
                </p>
                <button
                  type="submit"
                  className="btn btn-primary w-100 btn__sign-in"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
