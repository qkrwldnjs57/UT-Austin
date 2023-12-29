import { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
