/* eslint-disable no-console */
import React, { useEffect, useState } from "react"; // useState
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./manageEvent.css";
import {
  deleteEvent,
  getDataEvent,
  postEvent,
  updateEvent,
} from "../../stores/action/event";
import moment from "moment";
// import avatar from "../../assets/img/profile_dummy.png";

export default function ManageEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user.data);
  const [eventId, setEventId] = useState("");
  const page = 1;
  const limit = 20;
  const searchName = "";
  const date = "";
  const dataEvent = useSelector((state) => state.event.data);
  const [createForm, setCreateForm] = useState({
    name: "",
    category: "",
    location: "",
    detail: "",
    dateTimeShow: "",
    price: "",
    image: "",
  });
  const [updateForm, setUpdateForm] = useState({
    name: "",
    category: "",
    location: "",
    detail: "",
    dateTimeShow: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    try {
      dispatch(getDataEvent(page, limit, searchName, date));
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChangeCreate = (e) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };

  const handleChangeUpdate = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleSaveCreate = async (e) => {
    try {
      e.preventDefault();

      await dispatch(postEvent(createForm))
        .then((res) => {
          alert(res.value.data.msg);
          navigate("/manage-event");
          getEvent();
          // location.reload();
        })
        .catch((err) => alert(err));
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSaveUpdate = async (e) => {
    try {
      e.preventDefault();

      await dispatch(updateEvent(eventId, updateForm))
        .then((res) => {
          alert(res.value.data.msg);
          navigate("/manage-event");
          getEvent();
          // location.reload();
        })
        .catch((err) => alert(err));
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await dispatch(deleteEvent(id))
        .then((res) => {
          alert(res.value.data.msg);
          getEvent();
        })
        .catch((err) => alert(err));
    } catch (error) {
      console.log(error.response);
    }
  };

  console.log(eventId);
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
            <div className="col-10 manage__section">
              <div className="d-flex">
                <h4 className="col-9">Manage Event</h4>
                <button
                  type="button"
                  className="btn create__btn"
                  data-bs-toggle="modal"
                  data-bs-target="#create__modal"
                >
                  Create
                </button>
                {/* Create Event Modal */}
                <div
                  className="modal"
                  id="create__modal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                          Create Event
                        </h5>
                      </div>
                      <div className="modal-body">
                        <div className="event__form">
                          <form onSubmit={handleSaveCreate}>
                            <div className="d-flex top__event__form">
                              <div className="left__event__form">
                                <div className="d-flex flex-column event__name__form">
                                  <label htmlFor="event__name__input">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    className="event__name__input"
                                    name="name"
                                    placeholder="Input Name Event..."
                                    onChange={handleChangeCreate}
                                  />
                                </div>
                                <div className="d-flex flex-column event__location__form">
                                  <label htmlFor="event__location__input">
                                    Location
                                  </label>
                                  <input
                                    type="text"
                                    className="event__location__input"
                                    name="location"
                                    placeholder="Input Location Event..."
                                    onChange={handleChangeCreate}
                                  />
                                </div>
                                <div className="d-flex flex-column event__price__form">
                                  <label htmlFor="event__price__input">
                                    Price
                                  </label>
                                  <input
                                    type="text"
                                    className="event__price__input"
                                    name="price"
                                    placeholder="Input Price Event..."
                                    onChange={handleChangeCreate}
                                  />
                                </div>
                              </div>
                              <div className="right__event__form">
                                <div className="d-flex flex-column event__category__form">
                                  <label htmlFor="event__category__input">
                                    Category
                                  </label>
                                  <input
                                    type="text"
                                    className="event__category__input"
                                    name="category"
                                    placeholder="Input Category Event..."
                                    onChange={handleChangeCreate}
                                  />
                                </div>
                                <div className="d-flex flex-column event__date__form">
                                  <label htmlFor="event__date__input">
                                    Date
                                  </label>
                                  <input
                                    type="datetime-local"
                                    className="event__date__input"
                                    name="dateTimeShow"
                                    onChange={handleChangeCreate}
                                  />
                                </div>
                                <div className="d-flex flex-column event__image__form">
                                  <label>image</label>
                                  <div className="event__image__box">
                                    <label
                                      htmlFor="event__image__input"
                                      style={{ cursor: "pointer" }}
                                    >
                                      Choose File...
                                      <input
                                        type="file"
                                        className="event__image__input"
                                        id="event__image__input"
                                        name="image"
                                        style={{ display: "none" }}
                                        onChange={handleChangeCreate}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bottom__event__form">
                              <div className="d-flex flex-column event__detail__form">
                                <label htmlFor="event__detail__input">
                                  Detail
                                </label>
                                <input
                                  type="text"
                                  className="event__detail__input"
                                  name="detail"
                                  placeholder="Input Detail Event..."
                                  onChange={handleChangeCreate}
                                />
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-primary save__modal__btn"
                            >
                              Save
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* modal end */}
              </div>

              <div className="manage__event">
                {dataEvent.map((i) => (
                  <div key={i.eventId}>
                    <div className="d-flex manage__event__list">
                      <div className="manage__event__date">
                        <p style={{ color: "#FF8900" }}>
                          {moment(i.dateTimeShow).format("DD")}
                        </p>
                        <p>{moment(i.dateTimeShow).format("ddd")}</p>
                      </div>
                      <div className="manage__event__desc">
                        <h5>{i.name}</h5>
                        <p>{i.location}, Indonesia</p>
                        <p>{moment(i.dateTimeShow).format("ddd, Do MMM")}</p>
                        <div className="d-flex manage__event__option">
                          <Link to={`/detail/${i.eventId}`}>Detail</Link>
                          <Link
                            data-bs-toggle="modal"
                            data-bs-target="#update__modal"
                            onClick={() => setEventId(i.eventId)}
                          >
                            Update
                          </Link>
                          <Link onClick={() => handleDeleteEvent(i.eventId)}>
                            Delete
                          </Link>

                          {/* update Event Modal */}
                          <div
                            className="modal"
                            id="update__modal"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalCenterTitle"
                            aria-hidden="true"
                          >
                            <div
                              className="modal-dialog modal-dialog-centered"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLongTitle"
                                  >
                                    Update Event
                                  </h5>
                                </div>
                                <div className="modal-body">
                                  <div className="event__form">
                                    <form onSubmit={handleSaveUpdate}>
                                      <div className="d-flex top__event__form">
                                        <div className="left__event__form">
                                          <div className="d-flex flex-column event__name__form">
                                            <label htmlFor="event__name__input">
                                              Name
                                            </label>
                                            <input
                                              type="text"
                                              className="event__name__input"
                                              name="name"
                                              placeholder="Input Name Event..."
                                              onChange={handleChangeUpdate}
                                            />
                                          </div>
                                          <div className="d-flex flex-column event__location__form">
                                            <label htmlFor="event__location__input">
                                              Location
                                            </label>
                                            <input
                                              type="text"
                                              className="event__location__input"
                                              name="location"
                                              placeholder="Input Location Event..."
                                              onChange={handleChangeUpdate}
                                            />
                                          </div>
                                          <div className="d-flex flex-column event__price__form">
                                            <label htmlFor="event__price__input">
                                              Price
                                            </label>
                                            <input
                                              type="text"
                                              className="event__price__input"
                                              name="price"
                                              placeholder="Input Price Event..."
                                              onChange={handleChangeUpdate}
                                            />
                                          </div>
                                        </div>
                                        <div className="right__event__form">
                                          <div className="d-flex flex-column event__category__form">
                                            <label htmlFor="event__category__input">
                                              Category
                                            </label>
                                            <input
                                              type="text"
                                              className="event__category__input"
                                              name="category"
                                              placeholder="Input Category Event..."
                                              onChange={handleChangeUpdate}
                                            />
                                          </div>
                                          <div className="d-flex flex-column event__date__form">
                                            <label htmlFor="event__date__input">
                                              Date
                                            </label>
                                            <input
                                              type="datetime-local"
                                              className="event__date__input"
                                              name="dateTimeShow"
                                              onChange={handleChangeUpdate}
                                            />
                                          </div>
                                          <div className="d-flex flex-column event__image__form">
                                            <label>image</label>
                                            <div className="event__image__box">
                                              <label
                                                htmlFor="event__image__input"
                                                style={{ cursor: "pointer" }}
                                              >
                                                Choose File...
                                                <input
                                                  type="file"
                                                  className="event__image__input"
                                                  id="event__image__input"
                                                  name="image"
                                                  style={{
                                                    display: "none",
                                                  }}
                                                  onChange={handleChangeUpdate}
                                                />
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="bottom__event__form">
                                        <div className="d-flex flex-column event__detail__form">
                                          <label htmlFor="event__detail__input">
                                            Detail
                                          </label>
                                          <input
                                            type="text"
                                            className="event__detail__input"
                                            name="detail"
                                            placeholder="Input Detail Event..."
                                            onChange={handleChangeUpdate}
                                          />
                                        </div>
                                      </div>
                                      <button
                                        type="submit"
                                        className="btn btn-primary save__modal__btn"
                                      >
                                        Save
                                      </button>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* modal end */}
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
