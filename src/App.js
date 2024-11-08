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
import JobPost from "./components/job/JobPost.js";
import ClientDashboard from "./components/clientProfile/dashboard.jsx";
import FreelanceProfile from "./components/userProfile/FreelanceProfile.jsx";
import PortfolioManagement from "./components/userProfile/Portfolio.jsx";
import JobDetails from "./pages/jobDetails/jobDetails.jsx";
import BidList from "./pages/bidManagement/BidList.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/job/post" element={<JobPost />} />
          <Route path="/profile" element={<FreelanceProfile />} />
          <Route path="/portfolio" element={<PortfolioManagement />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/job-details/:id" element={<JobDetails />} />
          <Route path="/bid-list/:id" element={<BidList />} />
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
