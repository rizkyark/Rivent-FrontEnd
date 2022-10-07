/* eslint-disable no-console */
import "./order.css";
import { useState, useEffect } from "react";

import SeatPosition from "../../components/SeatPosition/index";

import ticketREG from "../../assets/img/regular.png";
import ticketVIP from "../../assets/img/vip.png";
import ticketVVIP from "../../assets/img/vvip.png";
import axios from "../../utils/axios";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function App() {
  const { state } = useLocation();
  const [fullSeat, setFullSeat] = useState([]); // DI GUNAKAN UNTUK MENAMPUNG SEAT YANG FULL
  const [activeSeat, setActiveSeat] = useState([]); // DIGUNAKAN UNTUK MENAMPUNG SEAT YANG SEDANG DIPILIH
  const [dataOrder, setDataOrder] = useState([]); // DIGUNAKAN UNTUK MENAMPUNG SEAT YANG SUDAH TERPILIH
  const [listBooking, setListBooking] = useState([]); // DIGUNAKAN UNTUK MENAMPUNG LIST DATA SEAT YANG SUDAH DI BOOKING
  const [dataEvent, setDataEvent] = useState([]); // DIGUNAKAN UNTUK MENAMPUNG DATA EVENT
  const [seatData, setSeatData] = useState([]); // DIGUNAKAN UNTUK MENAMPUNG DATA EVENT

  useEffect(() => {
    getDataBooking();
    getDataEvent();
  }, []);

  const getDataBooking = async () => {
    try {
      const resultdataBooking = await axios.get(
        `api/booking/section/${state.eventId}`
      );
      let dataFullSeat = resultdataBooking.data.data.filter(
        (item) => item.statusFull
      );
      dataFullSeat = dataFullSeat.map((item) => item.section);
      setFullSeat(dataFullSeat);
      setListBooking(resultdataBooking.data.data);
      console.log(resultdataBooking);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getDataEvent = async () => {
    try {
      const resultDataEvent = await axios.get(`api/event/${state.eventId}`);
      setDataEvent(resultDataEvent.data.data);
      console.log(resultDataEvent);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSelectSeat = (seat) => {
    // PROSES PEMILIHAN SEAT
    const data = seat.split("-");
    if (!fullSeat.includes(seat)) {
      if (activeSeat.includes(seat)) {
        const deleteSeat = activeSeat.filter((item) => item !== seat);
        const deleteDataOrder = dataOrder.filter((item) => item.seat !== seat);
        setActiveSeat(deleteSeat);
        setDataOrder(deleteDataOrder);
      } else {
        setActiveSeat([...activeSeat, seat]);
        setDataOrder([
          ...dataOrder,
          {
            seat,
            qty: 1,
            price: data[0].includes("VVIP")
              ? dataEvent[0].price * 3 // HARGA 3 KALI LIPAT UNTUK VVIP
              : data[0].includes("VIP")
              ? dataEvent[0].price * 2 // HARGA 2 KALI LIPAT UNTUK VIP
              : dataEvent[0].price, // HARGA TIDAK BERUBAH UNTUK REGULAR
          },
        ]);
        setSeatData(
          //   dataOrder.map((item) => item.price)
          // .reduce((prev, curr) => prev + curr, 0)
          dataOrder.reduce((prev, curr) => {
            return prev + curr.price;
          }, 0)
        );
      }
    }
  };

  const handleOrderSeat = () => {
    console.log(dataOrder);
  };

  const clearOrderSeat = () => {
    setActiveSeat([]);
    setDataOrder([]);
    setSeatData([]);
  };
  console.log(activeSeat);
  console.log(seatData);
  console.log(dataEvent);
  return (
    <>
      <Navbar />
      <div className="bg-grey">
        <div className="container order__container">
          <div className="card order__card">
            <div className="row m-5">
              <div className="col-sm-12 col-md-7 p-0 p-md-4">
                <div className="rotate-seat">
                  <SeatPosition
                    width="100%" // MEMBERIKAN BESARAN PADA POLA SEAT
                    height="100%" // MEMBERIKAN TINGGI PADA POLA SEAT
                    fullSeat={fullSeat}
                    activeSeat={activeSeat}
                    handleSelectSeat={handleSelectSeat}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-5 p-0 p-md-4">
                <h4>Tickets</h4>

                {activeSeat.length > 0 ? (
                  <div className="ticket-scrolling">
                    {dataOrder.map((item, index) => {
                      const data = item.seat.split("-");
                      const dataSeat = listBooking.filter(
                        (itemSeat) => itemSeat.section === item.seat
                      );
                      return (
                        <div className="my-3" key={index}>
                          <img
                            src={
                              data[0].includes("VVIP")
                                ? ticketVVIP
                                : data[0].includes("VIP")
                                ? ticketVIP
                                : ticketREG
                            }
                            className="ticket-icon"
                            alt="ticket icon"
                          />
                          <label className="ms-3">
                            Section {data[0]}, Row {data[1]} - $ {item.price}
                            <br />[
                            {dataSeat.length > 0
                              ? dataSeat[0].available
                              : data[0].includes("VVIP")
                              ? 10
                              : data[0].includes("VIP")
                              ? 20
                              : 30}{" "}
                            Seats Available]
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-50">
                    <h6>Select Seat</h6>
                  </div>
                )}
                <hr />
                <div className="d-flex total">
                  <div className="total__list">
                    {/* <h5>Ticket Section</h5> */}
                    <h5>Quantity</h5>
                    <h5>Total Payment</h5>
                  </div>
                  <div className="total__price">
                    {/* <h5>REG, VIP, VVIP</h5> */}
                    <h5>{activeSeat.length}</h5>
                    <h5>${seatData}</h5>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary btn_checkout"
                    onClick={handleOrderSeat}
                  >
                    Checkout
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ display: "none" }}
                    onClick={clearOrderSeat}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
