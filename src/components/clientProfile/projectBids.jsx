import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleBids = [
  {
    id: 1,
    title: "Project 1",
    description: "This is a sample project",
    budget: "$1000",
    deadline: "2024-03-16",
    skills: "React, Node.js",
    bids: [
      {
        id: 1,
        title: "Bid 1",
        description: "This is a sample bid",
        budget: "$500",
        deadline: "2024-03-10",
        skills: "React, Node.js",
      },
      {
        id: 2,
        title: "Bid 2",
        description: "This is another sample bid",
        budget: "$600",
        deadline: "2024-03-12",
        skills: "React, Node.js, MongoDB",
      },
    ],
  },
  {
    id: 2,
    title: "Project 2",
    description: "This is another sample project",
    budget: "$2000",
    deadline: "2024-04-16",
    skills: "React, Node.js, MongoDB",
    bids: [
      {
        id: 3,
        title: "Bid 3",
        description: "This is yet another sample bid",
        budget: "$700",
        deadline: "2024-04-10",
        skills: "React, Node.js, MongoDB, Express",
      },
    ],
  },
  {
    id: 3,
    title: "Project 3",
    description: "This is yet another sample project",
    budget: "$3000",
    deadline: "2024-05-16",
    skills: "React, Node.js, MongoDB, Express",
    bids: [],
  },
  {
    id: 4,
    title: "Project 4",
    description: "This is yet another sample project",
    budget: "$3000",
    deadline: "2024-05-16",
    skills: "React, Node.js, MongoDB, Express",
    bids: [],
  },
];

const ProjectBids = () => {
  const navigate = useNavigate();
  const [viewDetails, setViewDetails] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const [projectBids, setProjectBids] = useState(null);
  const [bidUser, setBidUser] = useState(null);
  const [bidId, setBidId] = useState(null);
  const handleViewDetails = (bid, id) => {
    // setProjectBids([]);
    // getProjectBids(id);
    // setSelectedBid(bid);
    // setBidId(id);
    navigate(`/bid-list/${id}`);
  };

  const handleAcceptBid = async (bid) => {
    try {
      const response = await axios.put(
        ` http://localhost:5000/api/profiles/bids/${bid._id}/accept`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Bid accepted:", bid);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleRejectBid = async (bid) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/profiles/bids/${bid._id}/reject`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Bid rejected:", bid);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const getProjectBids = async (id) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/profiles/bids/${userId}/${id}`
      );
      if (response.data) {
        console.log("1112 response.data bids", response.data);
        setProjectBids(response.data.bid);
        setBidUser(response.data.getFreeLanceUsers);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const fetchProjects = async () => {
    const userId = localStorage.getItem("userId");
    console.log("1112 userId", userId);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/profiles/client-jobs/${userId}/open`
      );
      console.log("1112 response", response);
      if (!response) {
        throw new Error("Network response was not ok");
      }
      console.log("1112 response.data yfhgfg");
      console.log("1112 response.data", response);
      if (response.data) {
        setProjectData(response.data);
      }
      console.log("Fetched projects:", response.data);
      // Assuming the response data is an array of projects
      // You might want to update the state or perform other actions with the fetched data
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  console.log("111 projectBids", projectBids);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Project Bids</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {projectData?.map((bid) => (
          <div
            key={bid._id}
            className="bg-white w-[100%] rounded-lg shadow-md p-4"
          >
            <h3 className="font-bold text-lg">{bid.title}</h3>
            <p className="text-gray-600">{bid.description}</p>
            <div className="mt-2 flex items-center space-x-4">
              <span className="flex items-center">{bid.budget}</span>
              {/* <span className="flex items-center">{bid.deadline}</span> */}
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">{bid.skills}</span>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              {/* <button className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600">
                Bid Now
              </button> */}
              <button
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                onClick={() => handleViewDetails(bid, bid?._id)}
              >
                Bids List
              </button>
            </div>
            {bidId === bid?._id &&
              projectBids &&
              projectBids.map((bid) => (
                <div className="mt-4 border rounded-lg p-4">
                  <h3 className="font-bold text-lg">Amount: {bid.amount}</h3>
                  <p className="text-gray-600">
                    Description : {selectedBid.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="flex items-center">
                      {selectedBid.budget}
                    </span>
                    <span className="flex items-center">
                      {selectedBid.deadline}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      {selectedBid.skills}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
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
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectBids;
