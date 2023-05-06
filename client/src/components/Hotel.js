import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/user";

function Hotel() {
  const { hotels, loading } = useContext(UserContext);
  const [hotel, setHotel] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    let hotel = hotels.find((h) => h.id === parseInt(id));
    setHotel(hotel);
  }, [id, hotels]);

  return loading ? (
    <h3 className="loading">Loading...</h3>
  ) : (
    <div className="one-hotel">
      <img src={hotel.image_url} alt="hotelimage" />
      <div className="one-hotel-text">
        <h3>{hotel.name}</h3>
        <p>{hotel.about}</p>
        <p>{hotel.location}</p>
        <p>Rating: {hotel.rating}</p>
        <p>Price per night: {hotel.price}</p>
        <p>Country: {hotel.country}</p>
      </div>
    </div>
  );
}

export default Hotel;
