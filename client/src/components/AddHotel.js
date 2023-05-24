import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

function AddHotel() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [about, setAbout] = useState("");
  const [telephone, setTelephone] = useState("");
  const [country, setCountry] = useState("");
  const { addHotel } = useContext(UserContext);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    addHotel({
      name: name,
      location: location,
      image_url: image_url,
      rating: rating,
      price: price,
      about: about,
      telephone: telephone,
      country: country,
    });
    navigate("/hotels");
  }

  // useEffect(() => {
  //   let hotel = hotels.find((h) => h.id === parseInt(hotelId));
  //   setH(hotel);
  // }, [hotelId, hotels]);

  return (
    <div className="createBooking">
      <h3>{"Create a new hotel"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={location}
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          value={image_url}
          placeholder="Image url"
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="text"
          value={rating}
          placeholder="Rating"
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="text"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          value={about}
          placeholder="About"
          onChange={(e) => setAbout(e.target.value)}
        />
        <input
          type="text"
          value={telephone}
          placeholder="Telephone"
          onChange={(e) => setTelephone(e.target.value)}
        />
        <input
          type="text"
          value={country}
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
        />

        <input type="submit" />
      </form>
    </div>
  );
}

export default AddHotel;
