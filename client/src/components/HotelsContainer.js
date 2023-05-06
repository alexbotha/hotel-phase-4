import React, { useContext } from "react";
import { UserContext } from "../context/user";
import HotelItem from "./HotelItem";

function HotelsContainer() {
  const { loggedIn, hotels } = useContext(UserContext);

  if (loggedIn) {
    return (
      <>
        <div>
          <h3>Hotels</h3>
          <br />
          <p>There are {hotels.length} hotels to chose from</p>
        </div>
        {hotels.map((hotel) => (
          <HotelItem key={hotel.id} hotel={hotel} />
        ))}
      </>
    );
  } else {
    return <h3>Please sign up or login</h3>;
  }
}

export default HotelsContainer;
