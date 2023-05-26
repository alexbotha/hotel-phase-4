import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { useParams, Link } from "react-router-dom";

function UserHotels({ users }) {
  const { loggedIn, loading } = useContext(UserContext);
  const params = useParams();

  if (loggedIn) {
    const found = users.find(({ id }) => id === parseInt(params.id));

    return loading ? (
      <h3 className="loading">Loading...</h3>
    ) : (
      <div className="my-account-details">
        <h3>{found.username} hotel bookings</h3>
        {found.bookings.map((book) => (
          <Link to={`/hotels/${book.hotel_id}`}>{book.hotel.name}</Link>
        ))}
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

export default UserHotels;
