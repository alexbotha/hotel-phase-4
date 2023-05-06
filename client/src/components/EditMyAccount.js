import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";

function EditMyAccount({ setEditPage }) {
  const { user, setUser } = useContext(UserContext);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [errorsList, setErrorsList] = useState([]);

  function handleChange(e) {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  }

  console.log(updatedUser);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setUser(data);
        } else {
          const errorLis = user.errors.map((e) => <li>{e}</li>);
          setErrorsList(errorLis);
        }
      });
    setEditPage(false);
  }

  return (
    <div className="edituserform">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
          value={updatedUser.username || ""}
        />
        <input
          type="text"
          name="first_name"
          onChange={handleChange}
          placeholder="first name"
          value={updatedUser.first_name || ""}
        />
        <input
          type="text"
          name="last_name"
          onChange={handleChange}
          placeholder="last name"
          value={updatedUser.last_name || ""}
        />
        <input
          type="text"
          name="email"
          onChange={handleChange}
          placeholder="email"
          value={updatedUser.email || ""}
        />
        <input
          type="text"
          name="telephone"
          onChange={handleChange}
          placeholder="telephone"
          value={updatedUser.telephone || ""}
        />
        <input
          type="date"
          name="birth_date"
          onChange={handleChange}
          placeholder="birth_date"
          value={updatedUser.birth_date || ""}
        />
        <input
          type="text"
          name="address"
          onChange={handleChange}
          placeholder="address"
          value={updatedUser.address || ""}
        />
        <input
          type="text"
          name="city"
          onChange={handleChange}
          placeholder="city"
          value={updatedUser.city || ""}
        />
        <input
          type="text"
          name="post_code"
          onChange={handleChange}
          placeholder="post code"
          value={updatedUser.post_code || ""}
        />
        <input
          type="text"
          name="avatar_url"
          onChange={handleChange}
          placeholder="profile photo link"
          value={updatedUser.avatar_url || ""}
        />
        <input type="submit" />
        <ul>{errorsList}</ul>
      </form>
    </div>
  );
}

export default EditMyAccount;
