import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/user";

function HotelsContainer() {
  const { loggedIn, hotels } = useContext(UserContext);

  if (loggedIn) {
    const hotelsList = hotels.map((hotel) => (
      <div>
        <h3>{hotel.name}</h3>
        <p>{hotel.location}</p>
        <NavLink to={`/hotels/${hotel.id}`}>See more!</NavLink>
      </div>
    ));
    return (
      <div>
        <h3>Hotels</h3>
        <br />
        <p>There are {hotels.length} hotels to chose from</p>
        {hotelsList}
      </div>
    );
  } else {
    return <h3>Please sign up or login</h3>;
  }
}

export default HotelsContainer;
