import React, { useContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { UserContext } from "../context/user";

import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import MyAccount from "./MyAccount";
import Hotel from "./Hotel";
import HotelsContainer from "./HotelsContainer";
import AddBookingForm from "./AddBookingForm";
import AddHotel from "./AddHotel";
import EditBooking from "./EditBooking";
import UserHotels from "./UserHotels";

function App() {
  const { loggedIn, error, user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  // UseEffect makes a fetch for ALL the users in the database so the usernames can be rendered below a hotel - as well as also being used in a ternary to prevent undefined
  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, [user]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={loggedIn ? <Home /> : <Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/hotels" element={<HotelsContainer />} />
        <Route exact path="/myaccount" element={<MyAccount />} />
        <Route
          exact
          path="/hotels/:hotelId/bookings/new"
          element={<AddBookingForm />}
        />

        <Route exact path="/hotels/:id" element={<Hotel users={users} />} />
        <Route exact path="/hotels/new" element={<AddHotel />} />
        <Route
          exact
          path="myaccount/bookings/:booking_id"
          element={users.length > 0 ? <EditBooking /> : null}
        />
        <Route
          exact
          path="/users/:id"
          element={users.length > 0 ? <UserHotels users={users} /> : null}
        />
        <Route
          exact
          path="*"
          element={<h3 className="errorHandle">404 page not found</h3>}
        />
      </Routes>
    </div>
  );
}

export default App;
