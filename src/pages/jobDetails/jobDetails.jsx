import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../services/Auth-provider";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState({});
  const [bid, setBid] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState(null);

  console.log("user id", id);

  useEffect(() => {
    const userDetails = localStorage.getItem("freelanceuser");
    const userDetailsObj = JSON.parse(userDetails);
    setUserData(userDetailsObj);

    const getJob = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/jobs/${id}`);
        console.log("response", response.data);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    getJob();
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${BASE_URL}/jobs/bid/${id}/${bid}/${userData?._id}`
      );
      console.log("response bid", response.data);
      if (response.data.success) {
        setSuccess(response.data.message);
        setBid("");
        toast.success(response.data.message);
        setError("");
      } else {
        setError(response.data.message);
        setSuccess("");
      }
    } catch (error) {
      console.error("Error bidding on job:", error);
    }
  };

  console.log("user", userData);

  return (
    <div className="mx-auto p-4 pt-6 w-1/3 justify-center items-center bg-white shadow-md rounded-lg">
      {/* <h1 className="text-3xl font-bold mb-4 text-gray-800">{job?.title}</h1> */}
      <p className="text-lg mb-2 text-gray-700">Title: {job?.title}</p>
      <p className="text-lg mb-2 text-gray-700">
        Company: {job?.company ? job?.company : "NA"}
      </p>
      <p className="text-lg mb-2 text-gray-700">Budget: $ {job?.budget}</p>
      <p className="text-lg mb-2 text-gray-700">
        Amount Type: {job?.amountType}
      </p>
      <p className="text-lg mb-2 text-gray-700">
        Duration: {job?.duration} months
      </p>
      <p className="text-lg mb-2 text-gray-700">
        Description: {job?.description}
      </p>
      {userData && userData?.role !== "client" && (
        <form onSubmit={handleBid} className="mt-4">
          <input
            type="number"
            min="1"
            pattern="[1-9]*"
            placeholder="Enter your bid"
            value={bid}
            onChange={(e) =>
              setBid(
                e.target.value < 1 || isNaN(e.target.value)
                  ? ""
                  : e.target.value
              )
            }
            required
            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && (
            <div className="bg-gray-100 border border-gray-400 text-black-700 p-2 mb-2 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 p-2 mb-2 rounded">
              {success}
            </div>
          )}
          {userData && userData?.role !== "client" && (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Place Bid
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default JobDetails;
