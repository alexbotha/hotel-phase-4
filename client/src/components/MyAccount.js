import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import { useNavigate, useParams, Link } from "react-router-dom";

function MyAccount() {
  const { loggedIn, user, setUser, loading, hotels, setHotels } =
    useContext(UserContext);

  function handleDelete(booking, bookingHotelId, bookingg) {
    let findBook = user.bookings.filter((b) => b.id !== booking);
    let y = { ...user, bookings: findBook };

    // This is the hotel that has a booking that has been deleted
    let hot = hotels.find((hotel) => hotel.id === bookingHotelId);

    //UpdatedBookings is an array of bookings without the delete booking
    let updatedBookings = hot.custom_users.filter((cu) => {
      return cu.id !== bookingg.user_id;
    });

    function updatedHotels() {
      let x = {
        ...hot,
        custom_users: updatedBookings,
      };

      return hotels.map((h) => {
        if (h.id === bookingHotelId) {
          return x;
        } else {
          return h;
        }
      });
    }

    fetch(`/bookings/${booking}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setUser(y);

        //user.bookings

        // if bookings.hotel_id === the delete booking hotels id
        // that means the user has a booking still
        // if its false - the user no longer has any bookings for that hotel
        // therefore we run sethotels to remove the name from the page
        let valid = !!y.bookings.find((booking) => {
          return booking.hotel_id === bookingHotelId;
        });

        // false = custom user does not have a booking
        // true = custom user HAS a booking(s)
        valid ? console.log("no") : setHotels(updatedHotels);
      } else {
        console.log("no");
      }
    });
  }

  if (loggedIn) {
    return loading ? (
      <h3 className="loading">Loading...</h3>
    ) : (
      <div className="my-account-details">
        <h3>{user.username} hotels booked</h3>
        {user.bookings.map((booking) => (
          <>
            <div>
              <h3>Hotel: {booking.hotel.name}</h3>
              <li>Guests: {booking.guests}</li>
              <li>Check in: {booking.check_in}</li>
              <li>Check out: {booking.check_out}</li>
              <button>
                <Link to={`/myaccount/bookings/${booking.id}`}>Edit</Link>
              </button>
              <button
                onClick={() =>
                  handleDelete(booking.id, booking.hotel.id, booking)
                }
              >
                Delete
              </button>
            </div>
          </>
        ))}
      </div>
    );
  } else {
    return <h3>Not available</h3>;
  }
}

export default MyAccount;
