// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const handleLogOut = () => {
    localStorage.clear("token");
    setToken();
    navigate("/login");
  };

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
  }, []);
  console.log("token", token);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="text-white text-xl">Freelance Marketplace</div>
          <div>
            <a href="/" className="text-white mr-4">
              Home
            </a>
            {token ? (
              <span
                className="text-white cursor-pointer"
                onClick={() => handleLogOut()}
              >
                Logout
              </span>
            ) : (
              <>
                <a href="/login" className="text-white mr-4">
                  Login
                </a>
                <a href="/signup" className="text-white">
                  Signup
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
