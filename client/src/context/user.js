import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  function login() {}

  function logout() {}

  function signup() {}

  return (
    <UserContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
