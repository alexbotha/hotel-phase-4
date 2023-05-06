import React from "react";
import { NavLink } from "react-router-dom";

function HotelItem({ hotel }) {
  return (
    <div className="all-hotels">
      <img src={hotel.image_url} alt="hotel" />
      <h3>{hotel.name}</h3>
      <NavLink to={`/hotels/${hotel.id}`}>See more!</NavLink>
      <br></br>
    </div>
  );
}

export default HotelItem;
