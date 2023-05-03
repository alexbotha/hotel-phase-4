import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { NavLink } from "react-router-dom";

function Home() {
  const { user, loggedIn } = useContext(UserContext);

  if (!loggedIn) {
    return <h3>Please login or signup</h3>;
  } else {
    return (
      <div>
        <h3>Welcome, {user.username}.</h3>
        <p>
          Thanks for chosing us to be your go to booking site. Here you will
          find everything you need when it comes to booking that well deserved
          retreat.
        </p>
        <br />
        <p>
          Follow the navbar links to browse the{" "}
          <NavLink to="/hotels">hotels</NavLink> we have on offer.
        </p>
        <br />
        <p>
          You can also see the bookings you currently have by visiting{" "}
          <NavLink to="/myaccount">my account.</NavLink>
        </p>
        <br />
        <p>After you're done, don't forget to log out.</p>
      </div>
    );
  }
}

export default Home;
