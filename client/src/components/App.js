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
  const { loggedIn } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, []);

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
        <Route exact path="/users/:id" element={<UserHotels users={users} />} />
      </Routes>
    </div>
  );
}

export default App;
