/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./detailPage.css";
import loveIcon from "../../assets/img/love.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import moment from "moment";
import Footer from "../../components/Footer";

export default function DetailPage() {
  const navigate = useNavigate();
  const dataUser = JSON.parse(localStorage.getItem("datauser"));
  const params = useParams();
  const [data, setData] = useState([]);
  const dataOrder = {
    userId: dataUser.userId,
    eventId: params.id,
    eventName: data.name,
    // paymentMethod: "Ovo",
    // section: ["REG1-1", "REG1-2", "REG1-1", "VIP1-1", "VVIP1-1"],
  };

  useEffect(() => {
    getEventbyId();
  }, []);

  const getEventbyId = async () => {
    try {
      const resultEventId = await axios.get(`api/event/${params.id}`);
      setData(resultEventId.data.data[0]);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleBuyTicket = async (event) => {
    try {
      event.preventDefault();
      // const resultBooking = await axios.post("api/booking", dataOrder);
      // console.log(resultBooking);
      navigate("/order", { state: dataOrder });
      // navigate("/order", { state: dataOrder });
      // console.log(pushBook)
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Navbar />
      {/* <!-- Detail Event --> */}
      <main className="main__detail__event">
        <section className="detail__event">
          <section className="detail__event__container">
            <img
              src={data.imagePath}
              className="img-fluid detail__event__image"
              alt="poster"
            />
            <div className="d-flex add__whistlist">
              <button className="btn">
                <img src={loveIcon} alt="" />
              </button>
              <p>Add to Whistlist</p>
            </div>
          </section>
          <section className="detail__event__desc">
            <div className="desktop__version">
              <h2>{data.name}</h2>
              <div className="d-flex event__locationandtime">
                <div className="d-flex event__location">
                  <img
                    src={require("../../assets/img/map_point_red.png")}
                    alt=""
                  />
                  <p>{data.location}, Indonesia</p>
                </div>
                <div className="d-flex event__time">
                  <img src={require("../../assets/img/clock.png")} alt="" />
                  <p>{moment(data.dateTimeShow).format("dddd, Do MMMM")}</p>
                </div>
              </div>
              <div className="event__attendees">
                <p>Attendees</p>
                <img src={require("../../assets/img/avatarevent.png")} alt="" />
              </div>
            </div>
            <h5>Event Detail</h5>
            <p>{data.detail}</p>
            <a href="">Read More</a>
            <div className="d-flex flex-column">
              <h5>Location</h5>
              <img
                src={require("../../assets/img/location.png")}
                className="event__map"
                alt=""
              />
            </div>
            <button
              className="btn btn-primary buy__button"
              onClick={handleBuyTicket}
            >
              Buy Ticket
            </button>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
