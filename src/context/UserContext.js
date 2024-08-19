import React, { createContext, useState, useEffect } from 'react';
import { Axios } from '../axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
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
