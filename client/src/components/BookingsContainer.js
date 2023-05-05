import React, { useState, useContext } from "react";
import { NavLink, Route, useParams } from "react-router-dom";
import { UserContext } from "../context/user";

function BookingsContainer() {
  const { loggedIn, user, bookings } = useContext(UserContext);
  const [formFlag, setFormFlag] = useState(false);
  const params = useParams();

  if (loggedIn) {
    // const bookingsList = bookings.map((booking) => <li>{booking.hotel.name}</li>);
    return (
      <div>
        <h3>{`${user.username}'s bookings`}</h3>
        <br></br>
        {/* {bookingsList} */}
      </div>
    );
  } else {
    return <h3>Please sign up or login</h3>;
  }
}

export default BookingsContainer;
