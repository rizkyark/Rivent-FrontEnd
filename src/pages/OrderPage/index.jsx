/* eslint-disable no-console */
import "./order.css";
import { useState, useEffect } from "react";

import SeatPosition from "../../components/SeatPosition/index";

import ticketREG from "../../assets/img/regular.png";
import ticketVIP from "../../assets/img/vip.png";
import ticketVVIP from "../../assets/img/vvip.png";
// import axios from "../../utils/axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function App() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [fullSeat, setFullSeat] = useState([]); // DI GUNAKAN UNTUK MENAMPUNG SEAT YANG FULL
  const [activeSeat, setActiveSeat] = useState([]); // DIGUNAKAN UNTUK MENAMPUNG SEAT YANG SEDANG DIPILIH
  const [dataOrder, setDataOrder] = useState([]); // DIGUNAKAN UNTUK MENAMPUNG SEAT YANG SUDAH TERPILIH
  const [listBooking, setListBooking] = useState([]); // DIGUNAKAN UNTUK MENAMPUNG LIST DATA SEAT YANG SUDAH DI BOOKING
  const [dataEvent, setDataEvent] = useState([]); // DIGUNAKAN UNTUK MENAMPUNG DATA EVENT
  const totalPayment = dataOrder.reduce((acc, obj) => {
    return acc + obj.price;
  }, 0);
  const totalTicket = dataOrder.reduce((acc, obj) => {
    return acc + obj.qty;
  }, 0);
  // const eventId = state.eventId;
  // const [pushOrder, setPushOrder] = useState({
  //   totalTicket: "",
  //   totalPayment: "",
  // });
  const pushOrder = {
    eventId: state.eventId,
    eventName: state.eventName,
    totalTicket: totalTicket,
    totalPayment: totalPayment,
    section: activeSeat,
  };

  // console.log(`ini event name= ${state.eventName}`);

  useEffect(() => {
    getDataBooking();
    getDataEvent();
  }, []);

  const getDataBooking = () => {
    // https://www.notion.so/Modul-Booking-293a2b5a8f2b4d09a8e1f25304592c22
    const DATADUMMY = {
      status: 200,
      message: "Success Get Data Section By Event Id",
      data: [
        {
          section: "REG1-1",
          booked: 20,
          available: 10,
          statusFull: false,
        },
        {
          section: "REG1-2",
          booked: 15,
          available: 15,
          statusFull: false,
        },
        {
          section: "REG1-3",
          booked: 0,
          available: 30,
          statusFull: false,
        },
        {
          section: "REG1-4",
          booked: 30,
          available: 0,
          statusFull: true,
        },
      ],
    };
    let dataFullSeat = DATADUMMY.data.filter((item) => item.statusFull);
    dataFullSeat = dataFullSeat.map((item) => item.section);
    setFullSeat(dataFullSeat);
    setListBooking(DATADUMMY.data);
  };

  const getDataEvent = () => {
    // https://www.notion.so/Modul-Event-413ecaad2dd04d4eb0c6c2afc4f50888
    const DATADUMMY = {
      status: 200,
      message: "Success Get Event By Id",
      data: [
        {
          eventId: "e29b8308-d23d-42f0-9071-639403c0c451",
          name: "We The Fest",
          category: "Music",
          location: "Jakarta",
          detail: "Lorem ipsum dolor amet",
          dateTimeShow: "2022-01-01 10:00:00",
          price: 150000,
        },
      ],
    };
    setDataEvent(DATADUMMY.data);
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
      }
    }
  };

  const handleOrderSeat = () => {
    navigate("/payment", { state: pushOrder });
    console.log(pushOrder);
  };

  const clearOrderSeat = () => {
    setActiveSeat([]);
    setDataOrder([]);
  };

  const increaseOrderSeat = (section) => {
    const findData = dataOrder.find((item) => item.seat === section.seat);
    const price = section.seat.includes("VVIP")
      ? dataEvent[0].price * 3 // HARGA 3 KALI LIPAT UNTUK VVIP
      : section.seat.includes("VIP")
      ? dataEvent[0].price * 2 // HARGA 2 KALI LIPAT UNTUK VIP
      : dataEvent[0].price; // HARGA TIDAK BERUBAH UNTUK REGULAR
    findData.qty += 1;
    findData.price = price * findData.qty;
    setDataOrder([...dataOrder]);
  };

  const decreaseOrderSeat = (section) => {
    const findData = dataOrder.find((item) => item.seat === section.seat);
    if (findData.qty === 1) {
      const deleteData = dataOrder.filter((item) => item.seat !== section.seat);
      const deleteSeat = activeSeat.filter((item) => item !== section.seat);
      setDataOrder(deleteData);
      setActiveSeat(deleteSeat);
    } else {
      const price = section.seat.includes("VVIP")
        ? dataEvent[0].price * 3 // HARGA 3 KALI LIPAT UNTUK VVIP
        : section.seat.includes("VIP")
        ? dataEvent[0].price * 2 // HARGA 2 KALI LIPAT UNTUK VIP
        : dataEvent[0].price; // HARGA TIDAK BERUBAH UNTUK REGULAR
      findData.qty -= 1;
      findData.price = price * findData.qty;
      setDataOrder([...dataOrder]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-grey">
        <div className="container">
          <div className="card">
            <div className="row m-5">
              <div className="col-sm-12 col-md-7 p-0 p-md-4">
                <div className="rotate-seat">
                  <SeatPosition
                    width="90%" // MEMBERIKAN BESARAN PADA POLA SEAT
                    height="90%" // MEMBERIKAN TINGGI PADA POLA SEAT
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
                          <br />
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => decreaseOrderSeat(item)}
                          >
                            -
                          </button>
                          <h5 className="d-inline mx-2">{item.qty}</h5>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => increaseOrderSeat(item)}
                          >
                            +
                          </button>
                          <hr />
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
                    <h5>Ticket Section</h5>
                    <h5>Quantity</h5>
                    <h5>Total Payment</h5>
                  </div>
                  <div className="total__price">
                    <h5>{activeSeat.join()}</h5>
                    <h5>{totalTicket}</h5>
                    <h5>{totalPayment}</h5>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary checkout__btn"
                    onClick={handleOrderSeat}
                  >
                    Checkout
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={clearOrderSeat}
                    style={{ display: "none" }}
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
