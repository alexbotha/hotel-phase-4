import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import { useNavigate, useParams, Link } from "react-router-dom";
import EditBooking from "./EditBooking";

function MyAccount() {
  const { loggedIn, user, setUser, loading } = useContext(UserContext);

  function handleDelete(booking) {
    let findBook = user.bookings.filter((b) => b.id !== booking);
    let y = { ...user, bookings: findBook };

    fetch(`/bookings/${booking}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setUser(y);
      } else {
        console.log("not yet");
      }
    });
  }

  if (loggedIn) {
    return loading ? (
      <h3 className="loading">Loading...</h3>
    ) : (
      <div className="my-account-details">
        <h3>{user.username} hotels booked</h3>
        {user.bookings.map((booking) => (
          <>
            <div>
              <h3>Hotel: {booking.hotel.name}</h3>
              <li>Guests: {booking.guests}</li>
              <li>Check in: {booking.check_in}</li>
              <li>Check out: {booking.check_out}</li>
              <button>
                <Link to={`/myaccount/bookings/${booking.id}`}>Edit</Link>
              </button>
              <button onClick={() => handleDelete(booking.id)}>Delete</button>
            </div>
          </>
        ))}
      </div>
    );
  } else {
    return <h3>Not available</h3>;
  }
}

export default MyAccount;
