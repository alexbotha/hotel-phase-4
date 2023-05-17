import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import { useNavigate, useParams } from "react-router-dom";
import AddBookingForm from "./AddBookingForm";

function EditBooking() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const navigate = useNavigate();

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
    navigate("/myaccount");
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
  }
}

export default EditBooking;
