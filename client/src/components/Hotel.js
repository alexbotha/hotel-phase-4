import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/user";

function Hotel() {
  const { hotels } = useContext(UserContext);
  const [hotel, setHotel] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let hotel = hotels.find((h) => h.id === parseInt(id));
    setHotel(hotel);
  }, [id, hotels]);

  console.log("here", hotel);

  return (
    <>
      <div className="carding">
        <img src={hotel.image_url} alt="hotelimage" />
      </div>
      <h3>{hotel.name}</h3>
      <p>{hotel.about}</p>
      <p>{hotel.location}</p>
      <p>Rating: {hotel.rating}</p>
      <p>Price per night: {hotel.price}</p>
      <p>Country: {hotel.country}</p>
    </>
  );
}

export default Hotel;
