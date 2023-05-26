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

  // Makes a fetch to custom route - show method in userscontroller - If any errors set logged in to false otherwise true
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

  // Fetches hotels - if any errors set error state and render error else set error to empty and set hotels state with data and loading to false once it's set hotels
  function fetchHotels() {
    fetch("/hotels")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError([]);
          setHotels(data);
          setLoading(false);
        }
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

          let hotelId = data.hotel.id;
          let hot = hotels.find((h) => h.id === hotelId);

          // Function that contains code that updates our hotels state with the bookings users username to render on the page similar to our setUser above
          function updatedHotels() {
            let updatedHotel = {
              ...hot,
              custom_users: [...hot.custom_users, data.user],
            };
            // Return our mapped hotels state and say if the mapped hotels id is equal to our data.hotel.id then we return our function
            return hotels.map((hotel) => {
              if (hotel.id === hotelId) {
                return updatedHotel;
                // else we return the hotel
              } else {
                return hotel;
              }
            });
          }

          // We then want to validate this by using !! operators to return a boolean - if the custom_users.id is equal to the data.user_id then we DONT want to render the useername again. If the usersname is not in the custom_users array we setHotels with our function
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
          setError(data.error);
        } else {
          const userBook = user.bookings.map((b) =>
            b.id === data.id ? data : b
          );

          const x = { ...user, bookings: userBook };

          setUser(x);
          navigate("/myaccount");
          setError([]);
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
        if (data.errors) {
          setError(data.errors);
        } else {
          setHotels([...hotels, data]);
          setError([]);
          navigate("/hotels");
        }
      });
  }

  //Call back function from our login component - setUser to user and loggedIn to true - then we fetch out hotels function
  function login(user) {
    setUser(user);
    setLoggedIn(true);
    fetchHotels();
  }

  //SetloggedIn to false and setUser back to null
  function logout() {
    setLoggedIn(false);
    setUser(null);
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
