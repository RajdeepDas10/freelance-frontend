// src/pages/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../services/Auth-provider";
import { toast } from "react-toastify";

const Signup = () => {
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("freelancer");
  const [registerResponse, setResponse] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await register(username, email, password, role);
    console.log("s", response);
    setResponse(response);
  };

  console.log("registerResponse", registerResponse);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Signup</h2>
      <span className="text-green-400 text-xl font-bold">
        {registerResponse}
      </span>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
