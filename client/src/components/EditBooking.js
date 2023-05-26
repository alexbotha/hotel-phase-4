import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import { useParams } from "react-router-dom";

function EditBooking() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const { error, editBooking, loading, loggedIn, user } =
    useContext(UserContext);

  const { booking_id } = useParams();

  useEffect(() => {
    let x = user.bookings.find((b) => b.id === parseInt(booking_id));
    setGuests(x.guests);
    setCheckIn(x.check_in);
    setCheckOut(x.check_out);
  }, [user, booking_id]);

  function handleSubmit(e) {
    e.preventDefault();
    editBooking({
      check_in: checkIn,
      check_out: checkOut,
      guests: guests,
      id: booking_id,
    });
  }

  if (loggedIn) {
    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <div className="edituserform">
        <h3>{`Edit booking for ${booking_id}`}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={checkIn}
            placeholder="Check in"
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <input
            type="date"
            value={checkOut}
            placeholder="Check out"
            onChange={(e) => setCheckOut(e.target.value)}
          />
          <input
            type="text"
            value={guests}
            placeholder="Number of guests"
            onChange={(e) => setGuests(e.target.value)}
          />

          <input type="submit" />
          <ul>{error}</ul>
        </form>
      </div>
    );
  } else {
    return (
      <div className="errorHandle">
        <h3>Please log in or sign up</h3>
      </div>
    );
  }
}

export default EditBooking;
