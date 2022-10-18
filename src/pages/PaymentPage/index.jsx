/* eslint-disable no-console */
import React from "react";
import "./paymentPage.css";
import checkpoint from "../../assets/img/checkpoint.png";
import checkpointHollow from "../../assets/img/checkpoint_hollow.png";
import arrowUp from "../../assets/img/up_arrow.png";
import arrowDown from "../../assets/img/down_arrow.png";
import addCard from "../../assets/img/add_card.png";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";

export default function PaymentPage() {
  const navigate = useNavigate();
  const dataUser = useSelector((state) => state.user.data);
  const { state } = useLocation();
  const pushBook = {
    userId: dataUser.userId,
    eventId: state.eventId,
    totalTicket: state.totalTicket,
    totalPayment: state.totalPayment,
    paymentMethod: "Credit Card",
    section: state.section,
  };

  const handlePayment = async () => {
    try {
      const resultPayment = await axios.post("api/booking", pushBook);
      alert(resultPayment.data.msg);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Navbar />
      <main className="main__payment">
        <section className="payment__section">
          <section className="payment__method">
            <h4>Payment Method</h4>
            <div className="d-flex choose__payment">
              <button className="btn">
                <img src={checkpoint} alt="" />
              </button>
              <img
                src={require("../../assets/img/card_icon.png")}
                className="icon"
                alt=""
              />
              <h6>Card</h6>
              <button className="btn arrow">
                <img src={arrowUp} alt="" />
              </button>
            </div>
            <div className="d-flex card__payment">
              <img src={require("../../assets/img/card_dummy.png")} alt="" />
              <button className="btn">
                <img src={addCard} className="add__card" alt="" />
              </button>
            </div>
            <div className="d-flex choose__payment">
              <button className="btn">
                <img src={checkpointHollow} alt="" />
              </button>
              <img
                src={require("../../assets/img/bank_icon.png")}
                className="icon"
                alt=""
              />
              <h6>Bank</h6>
              <button className="btn arrow">
                <img src={arrowDown} alt="" />
              </button>
            </div>
            <div className="d-flex choose__payment">
              <button className="btn">
                <img src={checkpointHollow} alt="" />
              </button>
              <img
                src={require("../../assets/img/retail_icon.png")}
                className="icon"
                alt=""
              />
              <h6>Retail</h6>
              <button className="btn arrow">
                <img src={arrowDown} className="arrow_retail" alt="" />
              </button>
            </div>
            <div className="d-flex choose__payment">
              <button className="btn">
                <img src={checkpointHollow} alt="" />
              </button>
              <img
                src={require("../../assets/img/emoney_icon.png")}
                className="icon"
                alt=""
              />
              <h6>Emoney</h6>
              <button className="btn arrow">
                <img src={arrowDown} className="arrow__emoney" alt="" />
              </button>
            </div>
          </section>
          <section className="ticket__detail">
            <h4>Ticket Detail</h4>
            <div className="d-flex detail__section">
              <div className="detail__section__left">
                <p>Event</p>
                <p>Ticket Section</p>
                <p>Quantity</p>
                <p>Total Payment</p>
              </div>
              <div className="detail__section__right">
                <p>{state.eventName}</p>
                <p>{state.section.join()}</p>
                <p>{state.totalTicket}</p>
                <p>{state.totalPayment}</p>
              </div>
            </div>
            <button
              className="btn btn-primary btn__payment"
              onClick={handlePayment}
            >
              Payment
            </button>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
