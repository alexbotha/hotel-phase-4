import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "../context/user";
import { UserContext } from "../context/user";

import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import BookingsContainer from "./BookingsContainer";
import Hotel from "./Hotel";
import HotelsContainer from "./HotelsContainer";

function App() {
  const { hotels } = useContext(UserContext);
  return (
    <div className="App">
      <UserProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/hotels" element={<HotelsContainer />} />
          <Route exact path="/myaccount" element={<BookingsContainer />} />
          <Route
            exact
            path="/myaccount/bookings"
            element={<BookingsContainer />}
          />
          <Route
            exact
            path="/hotels/:id"
            element={hotels.length > 0 ? <Hotel /> : null}
          />
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
