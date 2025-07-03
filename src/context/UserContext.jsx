import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const userProvider = ({children}) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(user) return;

    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        
      } catch (error) {
        
      }
    }

  });
}
