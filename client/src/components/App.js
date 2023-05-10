import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "../context/user";
import { UserContext } from "../context/user";

import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import MyAccount from "./MyAccount";
import Hotel from "./Hotel";
import HotelsContainer from "./HotelsContainer";
import AddBookingForm from "./AddBookingForm";

function App() {
  const { hotels, loggedIn, loading } = useContext(UserContext);
  return (
    <div className="App">
      <UserProvider>
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
          {/* <Route
            exact
            path="/myaccount/bookings"
            element={<MyAccount />}
          /> */}
          <Route exact path="/hotels/:id" element={<Hotel />} />
          {/* <Route
            exact
            path=""
            element={<AddBookingForm />}
          /> */}
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
