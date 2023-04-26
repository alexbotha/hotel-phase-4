import React, { useContext } from "react";
import { UserContext } from "../context/user";

function Home() {
  const { user } = useContext(UserContext);

  if (!user || user.error) {
    return <h3>Please login or signup</h3>;
  } else {
    return (
      <div>
        <h3>Welcome, {user.username}!</h3>
      </div>
    );
  }
}

export default Home;
