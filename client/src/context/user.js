import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        if (data.error) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
          fetchBookings();
          fetchHotels();
        }
      });
  }, []);

  function fetchBookings() {
    fetch("/bookings")
      .then((r) => r.json())
      .then((data) => {
        setBookings(data);
      });
  }

  function fetchHotels() {
    fetch("/hotels")
      .then((r) => r.json())
      .then((data) => {
        setHotels(data);
        setLoading(false);
      });
  }

  function addBooking(booking) {
    fetch("/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings([...bookings, data]);
      });
  }

  function addHotel(hotel) {
    fetch("/hotels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hotel),
    })
      .then((res) => res.json())
      .then((data) => {
        setHotels([...hotels, data]);
      });
  }

  function login(user) {
    setUser(user);
    setLoggedIn(true);
    fetchHotels();
    fetchBookings();
  }

  function logout() {
    setLoggedIn(false);
    setUser({});
  }

  function signup(user) {
    setUser(user);
    setLoggedIn(true);
    fetchHotels();
    fetchBookings();
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        signup,
        loggedIn,
        bookings,
        addBooking,
        hotels,
        addHotel,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
