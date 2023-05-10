import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

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
      <div className="navBarContainer">
        {<h3 className="username">{`bookingPlus: ${user.username}`}</h3>}
        <br />
        <div className="navButtons">
          <Button as={Link} to="/myaccount">
            myaccount
          </Button>
          <Button as={Link} to="/hotels">
            Hotels
          </Button>
          <Button onClick={logoutUser}>Logout</Button>
          {/* to="/logout" */}
        </div>
      </div>
    );
  } else {
    return <div className="navBarContainer"></div>;
  }
}

const Button = styled.button`
  cursor: pointer;
  font-size: 1.3rem;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 8px 16px;
  text-decoration: none;
  background-color: #0000;
  color: white;
  &:hover {
    opacity: 0.9;
  }
`;

export default Navbar;
