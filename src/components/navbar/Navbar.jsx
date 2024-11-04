// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/Auth-provider";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState("");
  const { user } = useAuth();

  const handleLogOut = () => {
    localStorage.clear("token");
    setToken();
    navigate("/login");
  };

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    const getuserData = localStorage.getItem("freelanceuser");
    setUserData(JSON.parse(getuserData));
    setToken(getToken);
  }, [user]);
  console.log("userData", userData);

  const handleNavigate = (url) => {
    navigate(url);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div
            onClick={() => handleNavigate("/")}
            className="text-white text-xl cursor-pointer"
          >
            Freelance Marketplace
          </div>
          <div>
            <span
              onClick={() => handleNavigate("/")}
              className="text-white mr-4 cursor-pointer"
            >
              Home
            </span>
            {token ? (
              <>
                {userData?.role === "freelancer" && (
                  <>
                    <span
                      className="text-white cursor-pointer mr-4"
                      onClick={() => handleNavigate("/profile")}
                    >
                      Profile
                    </span>
                    <span
                      className="text-white cursor-pointer mr-4"
                      onClick={() => handleNavigate("/portfolio")}
                    >
                      Portfolio
                    </span>
                  </>
                )}
                {userData?.role === "client" && (
                  <span
                    className="text-white cursor-pointer mr-4"
                    onClick={() => handleNavigate("/client-dashboard")}
                  >
                    Dashboard
                  </span>
                )}

                <span
                  className="text-white cursor-pointer"
                  onClick={() => handleLogOut()}
                >
                  Logout
                </span>
              </>
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
