import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const[user , setUser] = useState() ;
    const[loggedIn , setIsLoggedIn] = useState(false) ;

    const[currentRoom , setCurrentRoom] = useState() ;
    const[currentDormitory , setCurrentDormitory] = useState()  ;

 

  const value = {
    user ,
    setUser ,
    loggedIn , 
    setIsLoggedIn ,
    currentRoom ,
    setCurrentRoom ,
    currentDormitory ,
    setCurrentDormitory
   ,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}