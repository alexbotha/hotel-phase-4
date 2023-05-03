import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";

function Hotel() {
  const { hotels } = useContext(UserContext);
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    let hotel = hotels.find((h) => h.id === parseInt(hotels.id));
    setHotel(hotel);
  }, [hotels]);

  console.log(hotel);

  return (
    <div>
      <h3>bingo </h3>
    </div>
  );
}

export default Hotel;
