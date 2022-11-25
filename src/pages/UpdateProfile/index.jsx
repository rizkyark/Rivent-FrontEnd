/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./updateProfile.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserById,
  updateImage,
  updateProfile,
} from "../../stores/action/user";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user.data);
  const id = dataUser.userId;
  const [disableUsername, setDisableUsername] = useState(true);
  const [disableEmail, setDisableEmail] = useState(true);
  const [disableDate, setDisableDate] = useState(true);
  const [data, setData] = useState({
    name: dataUser.name,
    username: "",
    email: "",
    profession: "",
    nationality: "",
    dateOfBirth: "",
    gender: "",
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      dispatch(getUserById(dataUser.userId));
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeForm = (event) => {
    const { files } = event.target;

    const formData = new FormData();
    formData.append("image", files[0]);

    dispatch(updateImage(id, formData))
      .then((res) => {
        alert(res.value.data.msg);
        getUser();
      })
      .catch((err) => alert(err));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await dispatch(updateProfile(id, data))
        .then((res) => {
          alert(res.value.data.msg);
          getUser();
        })
        .catch((err) => alert(err));
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid" style={{ backgroundColor: "#F4F7FF" }}>
        <div className="profile__container">
          <div className="row vh-80">
            <div className="col side__profile">
              <div className="d-flex side__pp">
                <img
                  src={
                    dataUser.imagePath
                      ? dataUser.imagePath
                      : `https://ui-avatars.com/api/?name=${dataUser.username}&background=random&size=44`
                  }
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="side__pp__desc">
                  <p style={{ fontWeight: "600" }}>{dataUser.username}</p>
                  <p>
                    {dataUser.profession ? dataUser.profession : "Programmer"}
                  </p>
                </div>
              </div>
              <div className="profile__menu">
                <Link className="profile__link" to="/update-profile">
                  Profile
                </Link>
                <Link
                  className="manage__movie__link"
                  style={
                    dataUser.role === "admin"
                      ? { color: "#373A42" }
                      : { display: "none" }
                  }
                  to="/manage-event"
                >
                  Manage Event
                </Link>
                <Link className="booking__link" to="/update-profile">
                  My Booking
                </Link>
                <Link className="whistlist__link" to="/update-profile">
                  My Whistlist
                </Link>
                <Link className="setting__link" to="/update-profile">
                  Setting
                </Link>
                <Link className="logout__link" to="/update-profile">
                  Logout
                </Link>
              </div>
            </div>
            <div className="col-10 edit__profile">
              <h4>Profile</h4>
              <div className="d-flex edit__section">
                <div className="col-8 iedit__section__left">
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex form__section">
                      <div className="form__label">
                        <p>Name</p>
                        <p>Username</p>
                        <p>Email</p>
                        <p>Gender</p>
                        <p>Profession</p>
                        <p>Nationality</p>
                        <p>Birthday Date</p>
                      </div>
                      <div className="form__input">
                        <div className="edit__name">
                          <input
                            type="text"
                            className="form-control name__input"
                            name="name"
                            placeholder="Name"
                            value={data.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="edit__username">
                          <input
                            type="username"
                            className="username__input"
                            name="username"
                            placeholder={
                              dataUser.username ? dataUser.username : "Username"
                            }
                            disabled={disableUsername === false ? false : true}
                            onChange={handleChange}
                          />
                          <Link
                            onClick={() => {
                              setDisableUsername(false);
                            }}
                          >
                            edit
                          </Link>
                        </div>
                        <div className="edit__email">
                          <input
                            type="email"
                            className="email__input"
                            name="email"
                            placeholder={
                              dataUser.email ? dataUser.email : "Email"
                            }
                            disabled={disableEmail === false ? false : true}
                            onChange={handleChange}
                          />
                          <Link
                            onClick={() => {
                              setDisableEmail(false);
                            }}
                          >
                            edit
                          </Link>
                        </div>
                        <div className="edit__gender">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value={"male"}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="male"
                            style={{
                              marginLeft: "10px",
                              marginRight: "30px",
                              color: "#777777",
                            }}
                          >
                            Male
                          </label>
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value={"female"}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="female"
                            style={{ marginLeft: "10px", color: "#777777" }}
                          >
                            Female
                          </label>
                        </div>
                        <div className="edit__profession">
                          <select
                            name="profession"
                            className="form-select bg-primary-dark edit__select"
                            onChange={handleChange}
                          >
                            <option defaultValue={""} value="">
                              Choose Profession
                            </option>
                            <option value="Entepreneur">Entepreneur</option>
                            <option value="Programmer">Programmer</option>
                          </select>
                        </div>
                        <div className="edit__nationality">
                          <select
                            name="nationality"
                            className="form-select bg-primary-dark edit__select"
                            onChange={handleChange}
                          >
                            <option defaultValue={""} value="">
                              Choose Nationality
                            </option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="WNA">WNA</option>
                          </select>
                        </div>
                        <div className="edit__birthdate">
                          <input
                            type="date"
                            name="dateOfBirth"
                            className="birthdate__input"
                            value={
                              dataUser.dateOfBirth
                                ? dataUser.dateOfBirth
                                : data.dateOfBirth
                            }
                            onChange={handleChange}
                            disabled={disableDate === false ? false : true}
                          />
                          <Link
                            onClick={() => {
                              setDisableDate(false);
                            }}
                          >
                            edit
                          </Link>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 btn__update__profile"
                    >
                      Sign In
                    </button>
                  </form>
                </div>
                <div className="col edit__section__right">
                  <img
                    src={
                      dataUser.imagePath
                        ? dataUser.imagePath
                        : `https://ui-avatars.com/api/?name=${dataUser.username}&background=random&size=44`
                    }
                    alt="profile"
                    className="rounded-circle"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <label htmlFor="imageInput">
                    {/* <button type="button" className="btn btn-outline-primary">
                      Choose Photo
                    </button> */}
                    <div className="update__image__label">
                      <p>Choose Image</p>
                    </div>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="d-none"
                    name="image"
                    id="imageInput"
                    onChange={(event) => handleChangeForm(event)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
