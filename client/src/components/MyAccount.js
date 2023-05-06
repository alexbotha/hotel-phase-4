import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import EditMyAccount from "./EditMyAccount";

function MyAccount() {
  const { loggedIn, user } = useContext(UserContext);
  const [editPage, setEditPage] = useState(false);

  function editAccount() {
    setEditPage(true);
  }

  if (loggedIn && editPage === false) {
    // const bookingsList = bookings.map((booking) => <li>{booking.hotel.name}</li>);
    return (
      <>
        <div className="my-account-details">
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
          <button onClick={editAccount}>Click to edit details</button>
        </div>
        {/* {bookingsList} */}
      </>
    );
  } else if (loggedIn && editPage === true) {
    return <EditMyAccount setEditPage={setEditPage} />;
  } else {
    return <h3>Not available</h3>;
  }
}

export default MyAccount;
