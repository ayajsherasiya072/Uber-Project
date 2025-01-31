import React, { createContext } from "react";

export const UserDataContext = createContext();

function UserContext({ children }) {
  const user = "ayaj";

  return (
    <UserDataContext.Provider value={user}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext