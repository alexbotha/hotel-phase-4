import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { NavLink } from "react-router-dom";

function HotelItem({ hotel }) {
  const { loading } = useContext(UserContext);
  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div className="all-hotels">
      <img src={hotel.image_url} alt="hotel" />
      <h3>{hotel.name}</h3>
      <NavLink to={`/hotels/${hotel.id}`}>See more!</NavLink>
      <br></br>
    </div>
  );
}

export default HotelItem;
