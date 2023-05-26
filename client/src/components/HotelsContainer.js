import React, { useContext } from "react";
import { UserContext } from "../context/user";
import HotelItem from "./HotelItem";
import { NavLink, useNavigate } from "react-router-dom";

function HotelsContainer() {
  const { loggedIn, hotels, error, loading } = useContext(UserContext);
  const navigate = useNavigate();

  function createHotel() {
    navigate("/hotels/new");
  }

  if (loggedIn) {
    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <>
        <div>
          <h3 className="">Hotels</h3>
          <button className="createHotel" onClick={createHotel}>
            Create new hotel
          </button>
          <br />
          <p className="amountOfHotels">
            There are {hotels.length} hotels to chose from
          </p>
        </div>
        {hotels.map((hotel) => (
          <HotelItem key={hotel.id} hotel={hotel} />
        ))}
      </>
    );
  } else {
    return (
      <div className="errorHandle">
        <h3>{error}</h3>
      </div>
    );
  }
}

export default HotelsContainer;
