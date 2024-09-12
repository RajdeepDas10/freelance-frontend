// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/SignUp.jsx";
import HomePage from "./pages/home/Home.jsx";

// import other components and pages here
import "./index.css";
import { AuthProvider } from "./services/Auth-provider.js";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<HomePage />} />
          {/* Add more routes here */}
          {/* <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          /> */}
          {/* 
          
           <Route 
            path="/client-area" 
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientArea />
              </ProtectedRoute>
            } 
          />
          */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
