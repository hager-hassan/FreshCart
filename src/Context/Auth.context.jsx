import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  async function verifyToken() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
        {
          headers: {
            token: token,
          },
        }
      );

      setUserID(data.decoded.id);
      setUserName(data.decoded.name);
    } catch (error) {
        const message = error.response?.data?.message
        console.log(message);
        if(message === 'invalid token. Please login to get access'){
          localStorage.removeItem('token');
          setToken(null);
        }
        
    } finally {
      setLoading(false);
    }
  }

 useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        loading,
        setLoading,
        userID,
        userName,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
