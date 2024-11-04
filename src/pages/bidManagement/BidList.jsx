import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../config";

const BidList = () => {
  const navigate = useNavigate();
  const [bidData, setBidData] = useState([]);
  const { id } = useParams();
  console.log("id", id);
  const fetchBids = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/jobs/bids/list/${id}`);
      if (response.data) {
        console.log("response", response.data);
        setBidData(response.data);
      }
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  const handleAcceptBid = async (bid) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/profiles/bids/accept/${bid._id}`
      );
      if (!response) {
        throw new Error("Network response was not ok");
      }
      console.log("Bid accepted:", bid);
      fetchBids();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleRejectBid = async (bid) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/profiles/bids/reject/${bid._id}`
      );
      if (!response) {
        throw new Error("Network response was not ok");
      }
      console.log("Bid rejected:", bid);
      fetchBids();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  //   const handleAcceptBid = async (bid) => {
  //     console.log("bid", bid);
  //     try {
  //       const response = await axios.post(
  //         `${BASE_URL}/jobs/bids/accept/${bid._id}`
  //       );
  //       console.log("response", response);
  //     } catch (error) {
  //       console.error("Error accepting bid:", error);
  //     }
  //   };

  //   const handleRejectBid = async (bid) => {
  //     console.log("bid", bid);
  //     try {
  //       const response = await axios.post(
  //         `${BASE_URL}/jobs/bids/reject/${bid._id}`
  //       );
  //       console.log("response", response);
  //     } catch (error) {
  //       console.error("Error rejecting bid:", error);
  //     }
  //   };

  useEffect(() => {
    fetchBids();
  }, [id]);

  return (
    <div className="bg-white  rounded-xl p-8 w-full mx-auto">
      <h2 className="text-3xl font-bold mb-6">Bid List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {bidData?.map((bid) => (
          <div
            key={bid._id}
            className="bg-white w-full rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col">
              <h3 className="font-bold text-xl mb-2 ">
                Project Title:{" "}
                <span className="text-blue-500">{bid?.projectId?.title}</span>
              </h3>
              <p className="text-gray-700 mb-4">
                Project Description: {bid?.projectId?.description}
              </p>
              <span className="flex items-center mb-2">
                Project Budget: $ {bid?.projectId?.budget}
              </span>
              <span className="flex items-center mb-2">
                Project Duration: {bid?.projectId?.duration} months
              </span>
            </div>
            <div className="flex flex-col mt-4">
              <h3 className="font-bold text-xl mb-2">
                Freelancer Name:{" "}
                <span className="text-blue-500">
                  {bid?.assignedFreelancerId?.username}
                </span>
              </h3>
              <p className="text-gray-700 mb-4">
                Freelancer Email: {bid?.assignedFreelancerId?.email}
              </p>
              <span className="flex items-center mb-2">
                Bid Amount: $ {bid?.amount}
              </span>
            </div>
            {bid?.status === "pending" && bid?.projectId?.status === "open" && (
              <div className="flex items-center space-x-4 mt-6">
                <button
                  className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600"
                  onClick={() => handleAcceptBid(bid)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                  onClick={() => handleRejectBid(bid)}
                >
                  Reject
                </button>
              </div>
            )}
            {bid?.status === "accepted" && (
              <div className="flex items-center space-x-4 mt-6">
                <span className="text-green-500 text-xl font-bold">
                  Bid Accepted
                </span>
              </div>
            )}
            {bid?.status === "rejected" && (
              <div className="flex items-center space-x-4 mt-6">
                <span className="text-red-500 text-xl font-bold">
                  Bid Rejected
                </span>
              </div>
            )}
          </div>
        ))}

        {bidData?.length === 0 && (
          <div className="flex items-center  w-full space-x-4 mt-6">
            <span className="text-red-500 text-xl font-bold">
              No bids found!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BidList;
