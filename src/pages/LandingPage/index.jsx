import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./landingPage.css";
import submitArrow from "../../assets/img/submit_arrow.png";
// import leftArrow from "../../assets/img/arrow__left.png";
// import rightArrow from "../../assets/img/arrow_right.png";
import eventTittle from "../../assets/img/event_tittle.svg";
import axios from "../../utils/axios";
import Card from "../../components/Card";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

export default function LandingPage() {
  document.title = "Riven | Home";
  const navigate = useNavigate();
  const limit = 6;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [keyword, setKeyword] = useState("");
  const [searchName, setSearchName] = useState("");
  const [date, setDate] = useState("");
  // // eslint-disable-next-line no-console
  // console.log(localStorage.getItem(data));

  useEffect(() => {
    getDataEvent();
  }, []);

  useEffect(() => {
    getDataEvent();
  }, [page, searchName, date]);

  const getDataEvent = async () => {
    try {
      const resultEvent = await axios.get(
        `api/event?page=${page}&limit=${limit}&searchName=${searchName}&searchDateShow=${date}&asc=`
      );
      setData(resultEvent.data.data);
      setPageInfo(resultEvent.data.pagination);
      // eslint-disable-next-line no-console
      // console.log(resultEvent.data.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.response);
    }
  };

  const handlePagination = (data) => {
    setPage(data.selected + 1);
  };

  const handleDetailEvent = (id) => {
    navigate(`/detail/${id}`);
    // eslint-disable-next-line no-console
    console.log(id);
  };

  const handleSearchName = () => {
    // console.log(keyword);
    setSearchName(keyword);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

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
              onChange={(e) => setKeyword(e.target.value)}
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
              <button
                className="btn btn-default reveal"
                type="button"
                onClick={handleSearchName}
              >
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
              src={eventTittle}
              alt="event tittle"
              className="event__tittle"
            />
          </span>
          <h2>Events For You</h2>
        </div>
        <div className="event__date">
          {/* <button className="btn">
            <img src={leftArrow} alt="" className="arrow__left" />
          </button> */}
          <button className="btn" value={"2022,11,13"} onClick={handleDate}>
            13
            <br />
            Mon
          </button>
          <button className="btn" value={"2022,11,14"} onClick={handleDate}>
            14
            <br />
            Tue
          </button>
          <button className="btn" value={"2022,11,15"} onClick={handleDate}>
            15
            <br />
            Wed
          </button>
          <button className="btn" value={"2022,11,16"} onClick={handleDate}>
            16
            <br />
            Thu
          </button>
          <button className="btn" value={"2022,11,17"} onClick={handleDate}>
            17
            <br />
            Fri
          </button>
          {/* <button className="btn">
            <img src={rightArrow} alt="" className="arrow__right" />
          </button> */}
        </div>
        <div className="d-flex overflow-auto gap-4 event__now__list">
          {/* <!-- Card 1 --> */}
          {data.map((item) => (
            <div key={item.eventId}>
              <Card data={item} handleDetail={handleDetailEvent} />
            </div>
          ))}
        </div>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageInfo.totalPage}
          onPageChange={handlePagination}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </section>
      <Footer />
    </>
  );
}
