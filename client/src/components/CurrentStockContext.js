import fetch from "node-fetch";
import React, { createContext, useState, useEffect, useContext } from "react";
import { CurrentUserContext } from '../components/CurrentUserContext'


export const CurrentStockContext = createContext({});

// This context provider is passed to any component requiring the context
export const CurrentStockProvider = (props) => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [currentStock, setCurrentStock] = useState('');
  useEffect(async () => {
    await fetch(`http://localhost:5000/api/get-symbols?Email=${currentUser.Email}`)
    .then(res => res.json())
    .then(data => {
      setCurrentStock(data.symbols[0])
    })
  }, [])
  
  return (
    <CurrentStockContext.Provider value={[currentStock, setCurrentStock]}>
      {props.children}
    </CurrentStockContext.Provider>
  );
};