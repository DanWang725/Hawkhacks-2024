import React, { createContext, useState, useEffect } from 'react';
import { Axios } from '../axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in by calling a protected endpoint
    const checkLoginStatus = async () => {
      try {
        const response = await Axios.get('/users/me');
        setUser(response.data?.username);
      } catch (error) {
        setUser(null);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
