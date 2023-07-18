import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();
export const UserProvider = ({ children }) => {
    useEffect(()=>{
        AsyncStorage.getItem('user').then(res => {
            if (res) {
             setUser(JSON.parse(res));   
            }
        })
    },[])
  const [user, setUser] = useState(null);

  const setUserData = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
