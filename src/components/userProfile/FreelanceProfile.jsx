import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/Auth-provider";

const UserProfileManagement = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: e.target.value.split(","),
    }));
  };

  useEffect(() => {
    // Fetch user profile data
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${BASE_URL}/profiles/freelancer-profile/${userId}`
    );
    const data = await response.json();
    setProfile({
      bio: data?.bio,
      email: data?.email,
      password: data?.password,
      role: data?.role,
      skills: data?.skills,
      username: data?.username,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("profile", profile);
    const userId = localStorage.getItem("userId");
    const response = await axios.put(
      `${BASE_URL}/profiles/freelancer-profile/${userId}`,
      profile
    );
    console.log("response", response);
    if (response.status === 200) {
      toast.success("Profile updated successfully!");
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProfile((prevProfile) => ({
  //     ...prevProfile,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Profile updated:", profile);
  //   // Simulating an API call
  //   setTimeout(() => {
  //     alert("Profile updated successfully!");
  //   }, 1000);
  // };

  const handleDelete = async () => {
    const userId = localStorage.getItem("userId");
    const response = await axios.delete(
      `${BASE_URL}/users/delete/freelancer-profile/${userId}`
    );
    console.log("response", response);
    if (response.status === 200) {
      toast.success("Profile deleted successfully!");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      logout();
      navigate("/login");
    } else {
      toast.error("Failed to delete profile!");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6">Freelancer Profile Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.username}
            onChange={handleInputChange}
            disabled
            required
            className="mt-1 cursor-not-allowed block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            disabled
            required
            className="mt-1 cursor-not-allowed block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={profile?.bio}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills (comma-separated)
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={profile?.skills}
            onChange={handleSkillsChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete your profile?")
              ) {
                handleDelete();
              }
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileManagement;
