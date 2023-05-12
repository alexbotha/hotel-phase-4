import React, { useContext } from "react";
import { UserContext } from "../context/user";

function MyAccount() {
  const { loggedIn, user, loading } = useContext(UserContext);

  if (loggedIn) {
    return loading ? (
      <h3 className="loading">Loading...</h3>
    ) : (
      <>
        {/* <div className="my-account-details">
          <h3>{`${user.username}'s profile`}</h3>
          <p>{`First name: ${user.first_name}`}</p>
          <p>{`Last name: ${user.last_name}`}</p>
          <p>{`Email: ${user.email}`}</p>
          <p>{`Telephone: ${user.telephone}`}</p>
          <p>{`DOB: ${user.birth_date}`}</p>
          <p>{`address: ${user.address}`}</p>
          <p>{`City: ${user.city}`}</p>
          <p>{`Post code: ${user.post_code}`}</p>
          <p>{`Profile photo: ${user.avatar_url}`}</p>
          <br></br>
        </div> */}
        <>
          <div className="my-account-details">
            <h3>{user.username} hotels booked</h3>
            {user.bookings.map((booking) => (
              <>
                <li>{booking.hotel.name}</li>
                <button>Edit</button>
                <button>Delete</button>
              </>
            ))}
          </div>
        </>
      </>
    );
  } else {
    return <h3>Not available</h3>;
  }
}

export default MyAccount;
