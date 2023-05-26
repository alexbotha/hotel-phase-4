import React, { useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UserContext } from "../context/user";

function Hotel() {
  const { hotels, loading, loggedIn } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  function book() {
    navigate(`/hotels/${id}/bookings/new`);
  }

  if (loggedIn) {
    let hotel = hotels.find((h) => h.id === parseInt(id));

    return loading ? (
      <h3 className="loading">Loading...</h3>
    ) : (
      <>
        <div className="one-hotel">
          <img src={hotel.image_url} alt="hotelimage" />
          <div className="one-hotel-text">
            <h3>{hotel.name}</h3>
            <p>{hotel.about}</p>
            <p>{hotel.location}</p>
            <p>Rating: {hotel.rating}</p>
            <p>Price per night: {hotel.price}</p>
            <p>Country: {hotel.country}</p>
            <h3>Who's booked this?</h3>
            {hotel.custom_users.map((user) => (
              <li>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </li>
            ))}
          </div>
        </div>
        <button className="bookHotel" onClick={book}>Interested? Book now!</button>
      </>
    );
  } else {
    return (
      <div className="errorHandle">
        <h3>Please log in or sign up</h3>
      </div>
    );
  }
}

export default Hotel;
