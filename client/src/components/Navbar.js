import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate, NavLink } from "react-router-dom";

function Navbar() {
  const { user, logout, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  function logoutUser() {
    fetch("/logout", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    }).then(() => {
      logout();
      navigate("/");
    });
  }

  if (loggedIn) {
    return (
      <div className="navbar">
        <h3>{`${user.username}'s account`}</h3>

        <br />
        <NavLink to="/hotels">
          <button>Hotels</button>
        </NavLink>
        <NavLink to="/myaccount">
          <button>My account </button>
        </NavLink>
        <button onClick={logoutUser}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <NavLink to="/login">
          <button>Login</button>
        </NavLink>
        <NavLink to="/signup">
          <button>Signup</button>
        </NavLink>
      </div>
    );
  }
}

export default Navbar;
