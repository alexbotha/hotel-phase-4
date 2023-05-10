import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import { useNavigate, useParams } from "react-router-dom";

function AddBookingForm({}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [overallPrice, setOverallPrice] = useState("");
  const [h, setH] = useState("");
  const { addBooking, hotels } = useContext(UserContext);
  const { hotelId } = useParams();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    addBooking({
      check_in: checkIn,
      check_out: checkOut,
      guests: guests,
      overallPrice: overallPrice,
      hotel_id: hotelId,
    });
    navigate("/myaccount");
  }

  useEffect(() => {
    let hotel = hotels.find((h) => h.id === parseInt(hotelId));
    setH(hotel);
  }, [hotelId, hotels]);

  return (
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
        {/* <input
        type="integer"
        value={overallPrice}
        placeholder="overll"
        onChange={(e) => setOverallPrice(e.target.value)}
      /> */}
        <input type="submit" />
      </form>
      <h2>Total price: {h.price}</h2>
    </div>
  );
}

export default AddBookingForm;
