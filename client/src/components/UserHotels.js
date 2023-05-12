import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { useParams, Link } from "react-router-dom";

function UserHotels({ users }) {
  const { loggedIn, loading } = useContext(UserContext);
  const params = useParams();
  const found = users.find(({ id }) => id === parseInt(params.id));
  console.log(found);

  if (loggedIn) {
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
    return <h3>Not available</h3>;
  }
}

export default UserHotels;
