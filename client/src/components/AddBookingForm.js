import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";

function AddBookingForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [overallPrice, setOverallPrice] = useState("");
  const { addBooking } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    addBooking({
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests,
      overallPrice: overallPrice,
    });
  }

  return (
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
      {/* <input
        type="integer"
        value={overallPrice}
        placeholder="overll"
        onChange={(e) => setOverallPrice(e.target.value)}
      /> */}
      <input type="submit" />
    </form>
  );
}

export default AddBookingForm;
