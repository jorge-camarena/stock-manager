import React, { createContext, useState } from "react";

export const CurrentUserContext = createContext({});

// This context provider is passed to any component requiring the context
export const CurrentUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({
    loggedInStatus: false,
    Name: '',
    Email: '',
    authToken: null
  });

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};