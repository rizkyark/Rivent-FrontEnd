import React from "react";
import Navbar from "../../components/Navbar";
import "./landingPage.css";
import submitArrow from "../../assets/img/submit_arrow.png";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="hero">
        <div className="d-flex align-items-lg-center justify-content-lg-center w-100 w-lg-50 hero__left">
          <p>
            Find events you
            <br />
            love with our
          </p>
          <form className="hero__left__form">
            <div className="d-flex position-relative">
              <span className="hero__searchicn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </span>
            </div>
            <input
              type="text"
              className="hero__input"
              placeholder="Search Event..."
            />
            <span className="hero__mapicn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </span>
            <select className="hero__select">
              <option>Where ?</option>
              <option>option 1</option>
              <option>option 2</option>
              <option>option 3</option>
            </select>
            <span className="hero__submit">
              <button className="btn btn-default reveal" type="button">
                <img src={submitArrow} alt="" />
              </button>
            </span>
          </form>
        </div>
        <div className="d-flex align-items-center justify-content-center w-100 w-lg-50 hero__right">
          <img
            src={require("../../assets/img/people.png")}
            className="img-fluid hero__right--image"
            alt="Banner Hero"
          />
        </div>
      </div>

      {/* <!-- event --> */}
      <section className="d-flex flex-column event__now">
        <div className="d-flex flex-column align-items-center justify-content-between w-100">
          <span>
            <img
              src="./assets/img/event_tittle.svg"
              alt="event tittle"
              className="event__tittle"
            />
          </span>
          <h2>Events For You</h2>
        </div>
        <div className="event__date">
          <button className="btn">
            <img
              src="./assets/img/arrow__left.png"
              alt=""
              className="arrow__left"
            />
          </button>
          <button className="btn">
            13
            <br />
            Mon
          </button>
          <button className="btn">
            14
            <br />
            Tue
          </button>
          <button className="btn">
            15
            <br />
            Wed
          </button>
          <button className="btn">
            16
            <br />
            Thu
          </button>
          <button className="btn">
            17
            <br />
            Fri
          </button>
          <button className="btn">
            <img
              src="./assets/img/arrow_right.png"
              alt=""
              className="arrow__right"
            />
          </button>
        </div>
        <div className="d-flex overflow-auto gap-4 event__now__list">
          {/* <!-- Card 1 --> */}
          <div
            className="card border-0 align-items-center event__now__card"
            onClick="location.href='./eventDetail.html'"
          >
            <img
              src="./assets/img/sight&sounds.png"
              className="card-img h-100 event__now__img"
              alt="image event"
            />
            <div className="card-img-overlay now__card__overlay">
              <p className="card-title text-white">Wed, 15 Nov, 4.00 PM</p>
              <h5 className="card-text text-white">
                Sight & Sounds Exhibition
              </h5>
              <img
                src="./assets/img/avatarevent.png"
                alt=""
                style="width: 90px"
              />
            </div>
          </div>
          {/* <!-- Card 2 --> */}
          <div
            className="card border-0 align-items-center event__now__card"
            onClick="location.href='./eventDetail.html'"
          >
            <img
              src="./assets/img/gold_class.png"
              className="card-img h-100 event__now__img"
              alt="image event"
            />
            <div className="card-img-overlay now__card__overlay">
              <p className="card-title text-white">Thu, 16 Nov, 7:00 PM</p>
              <h5 className="card-text text-white">See it in Gold Class</h5>
              <img
                src="./assets/img/avatarevent.png"
                alt=""
                style="width: 90px"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-outline-primary see__all__btn">
            See All
          </button>
        </div>
      </section>
    </>
  );
}
