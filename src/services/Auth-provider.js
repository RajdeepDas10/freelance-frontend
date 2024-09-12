import axios from "axios";
import { createContext, useContext, useState } from "react";

// Auth context
const AuthContext = createContext();

const url = "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated API calls
  const login = async (email, password) => {
    //  make an API call here
    const response = await axios.post(`${url}/users/login`, {
      username: email,
      password: password,
    });

    localStorage.setItem("token", response.data.token);
    console.log("response", response);
    setUser(response.data.user);
    return response;
  };

  const register = async (username, email, password, role) => {
    // make an API call here
    const response = await axios
      .post(`${url}/users/register`, {
        email: email,
        password: password,
        role: role,
        username: username,
      })
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        console.log("errr", err);
        return err.response.data.message;
      });
    console.log("response.response.status", response);

    return response;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = { user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);