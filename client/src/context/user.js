import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        if (data.error) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
      });
    fetchHotels();
  }, []);

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
        if (data.errors) {
          setError(data.errors);
        } else {
          setUser({ ...user, bookings: [...user.bookings, data] });

          // let cusId = data.user.id;
          // let hotelBooking = Object.fromEntries(
          //   Object.entries(data).filter((e) => e[0] !== "hotel")
          // );

          // let hotelId = data.hotel.id;
          // let hot = hotels.find((e) => e.id === hotelId);

          // let updatedHotel = {
          //   ...hot,
          //   custom_users: [...hot.custom_users, data.user],
          // };

          // if a booking is added we want to check if username is in custom_users once
          // if it is in custom_users then we don't update hotels
          // create a boolean to measure whether a booking.user_id is already in custom_users

          // const z = hot.custom_users.map((cu) => cu.id);

          let hotelId = data.hotel.id;
          let hot = hotels.find((e) => e.id === hotelId);

          function updatedHotels() {
            let updatedHotel = {
              ...hot,
              custom_users: [...hot.custom_users, data.user],
            };

            return hotels.map((hotel) => {
              if (hotel.id === hotelId) {
                return updatedHotel;
              } else {
                return hotel;
              }
            });
          }

          let valid = !!hot.custom_users.find((cu) => cu.id === data.user_id);

          valid ? console.log("no") : setHotels(updatedHotels);

          setError([]);
          navigate("/myaccount");
        }
      });
  }

  function editBooking(booking) {
    fetch(`/bookings/${booking.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          const error = <li>{data.error}</li>;
          setError(error);
        } else {
          const userBook = user.bookings.map((b) =>
            b.id === data.id ? data : b
          );

          const x = { ...user, bookings: userBook };

          setUser(x);
        }
      });
  }

  // for deleting data in state we filter
  // for uodating data in state we map
  // for adding data in state we spread

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
  }

  function logout() {
    setLoggedIn(false);
    setUser({});
  }

  function signup(user) {
    setUser(user);
    setLoggedIn(true);
    fetchHotels();
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
        addBooking,
        hotels,
        addHotel,
        loading,
        editBooking,
        error,
        setHotels,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
