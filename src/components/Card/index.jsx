/* eslint-disable react/prop-types */
import React from "react";
import "./card.css";

export default function Card(props) {
  return (
    <>
      <div
        className="card border-0 align-items-center event__now__card"
        onClick={() => props.handleDetail(props.data.eventId)}
      >
        <img
          src={
            props.data.imagePath
              ? props.data.imagePath
              : "https://via.placeholder.com/300x400.png?text=+"
          }
          className="card-img h-100 event__now__img"
          alt={props.data?.name}
          style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
        />
        <div className="card-img-overlay now__card__overlay">
          <p className="card-title text-white">Wed, 15 Nov, 4.00 PM</p>
          <h5 className="card-text text-white">{props.data.name}</h5>
          <img
            src={require("../../assets/img/avatarevent.png")}
            alt=""
            style={{ width: "90px" }}
          />
        </div>
      </div>
    </>
  );
}
