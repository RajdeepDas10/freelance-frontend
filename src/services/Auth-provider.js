import axios from "axios";
import { createContext, useContext, useState } from "react";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";

// Auth context
const AuthContext = createContext();

const url = BASE_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated API calls
  const login = async (email, password) => {
    //  make an API call here
    try {
      const response = await axios.post(`${url}/users/login`, {
        username: email,
        password: password,
      });

      console.log("response", response);
      if (response.status === 400) {
        toast.error(response.data.message);
        return response.data.message;
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("freelanceuser", JSON.stringify(response.data.user));
      localStorage.setItem("userId", response.data.user._id);
      setUser(response.data.user);
      toast.success("Login successful");
      window.location.href = "/dashboard";
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
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
        toast.success(res.data.message);
        return res.data.message;
      })
      .catch((err) => {
        console.log("errr", err);
        toast.error(err.response.data.message);
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
