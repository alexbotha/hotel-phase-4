import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import { useParams } from "react-router-dom";

function AddBookingForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [h, setH] = useState("");
  const { addBooking, hotels, loggedIn, loading, error } =
    useContext(UserContext);

  const { hotelId } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    addBooking({
      check_in: checkIn,
      check_out: checkOut,
      guests: guests,
      hotel_id: hotelId,
    });
  }

  useEffect(() => {
    let hotel = hotels.find((h) => h.id === parseInt(hotelId));
    setH(hotel);
  }, [hotelId, hotels]);

  if (loggedIn) {
    return loading ? (
      <h3>Loading...</h3>
    ) : (
      <div className="createBooking">
        <h3>{`Create a booking for ${h ? h.name : ""}`}</h3>
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
            type="number"
            value={guests}
            placeholder="Number of guests"
            onChange={(e) => setGuests(e.target.value)}
          />

          <input type="submit" />
        </form>

        {error.map((e) => {
          return <li>{e}</li>;
        })}
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

export default AddBookingForm;
