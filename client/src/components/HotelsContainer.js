import React, { useContext } from "react";
import { UserContext } from "../context/user";
import HotelItem from "./HotelItem";
import { NavLink, useNavigate } from "react-router-dom";

function HotelsContainer() {
  const { loggedIn, hotels, bookings } = useContext(UserContext);
  const navigate = useNavigate();

  function createHotel() {
    navigate("/hotels/new");
  }

  if (loggedIn) {
    return (
      <>
        <div>
          <h3 className="">Hotels</h3>
          <button onClick={createHotel}>Create new hotel</button>
          <br />
          <p className="">There are {hotels.length} hotels to chose from</p>
        </div>
        {hotels.map((hotel) => (
          <HotelItem key={hotel.id} hotel={hotel} />
        ))}
      </>
    );
  } else {
    return (
      <h3 className="errorHandle">
        Please <NavLink to={"/signup"}>sign up</NavLink> or{" "}
        <NavLink to={"/login"}>login</NavLink>
      </h3>
    );
  }
}

export default HotelsContainer;
