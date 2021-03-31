import React, { createContext, useState, useEffect } from "react";


export const CurrentTimeContext = createContext({});

// This context provider is passed to any component requiring the context
export const CurrentTimeProvider = (props) => {
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    setCurrentTime('oneWeek')
  }, [])

  return (
    <CurrentTimeContext.Provider value={[currentTime, setCurrentTime]}>
      {props.children}
    </CurrentTimeContext.Provider>
  );
};