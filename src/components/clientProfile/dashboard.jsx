import React, { useState } from "react";
import ClientProfile from "./profile";
import ClientPortfolio from "./portfolio";
import ClientProjects from "./projects";
import ProjectBids from "./projectBids";
import PortfolioDashboard from "./portfolio";
import ProjectProgress from "./Progress";

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [clientProfile, setClientProfile] = useState({
    name: "Acme Corporation",
    email: "contact@acme.com",
    industry: "Technology",
    description:
      "Leading tech company specializing in innovative software solutions.",
  });
  const [clientPortfolio, setClientPortfolio] = useState([
    {
      id: 1,
      title: "Product Launch Campaign",
      description: "Successful marketing campaign for our flagship product",
      imageUrl: "/api/placeholder/300/200",
    },
    {
      id: 2,
      title: "Company Website Redesign",
      description: "Modernized our online presence",
      imageUrl: "/api/placeholder/300/200",
    },
  ]);
  const [clientProjects, setClientProjects] = useState([
    {
      id: 1,
      title: "Mobile App Development",
      description: "Develop a new mobile app for our customers",
      budget: "$50,000",
      deadline: "2023-12-31",
      status: "Open",
    },
    {
      id: 2,
      title: "SEO Optimization",
      description: "Improve our website s search engine rankings",
      budget: "$10,000",
      deadline: "2023-09-30",
      status: "In Progress",
    },
  ]);

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("freelanceuser"))
  );

  const handleUpdateProfile = (updatedProfile) => {
    setClientProfile(updatedProfile);
    // In a real application, you would make an API call here to update the profile on the server
  };

  const handleUpdatePortfolio = (updatedPortfolio) => {
    setClientPortfolio(updatedPortfolio);
    // In a real application, you would make an API call here to update the portfolio on the server
  };

  const handleUpdateProjects = (updatedProjects) => {
    setClientProjects(updatedProjects);
    // In a real application, you would make an API call here to update the projects on the server
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center mr-4 px-4 py-2 rounded-md ${
            activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {/* <User className="mr-2" /> */}
          Profile
        </button>
        <button
          onClick={() => setActiveTab("portfolio")}
          className={`flex items-center mr-4 px-4 py-2 rounded-md ${
            activeTab === "portfolio" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {/* <FolderOpen className="mr-2" /> */}
          Portfolio
        </button>
        {/* <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center px-4 py-2 rounded-md ${
            activeTab === "projects" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Projects
        </button> */}
        <button
          onClick={() => setActiveTab("bids")}
          className={`flex items-center px-4 py-2 mr-4 rounded-md ${
            activeTab === "bids" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Bids
        </button>
        <button
          onClick={() => setActiveTab("inprogress")}
          className={`flex items-center px-4 py-2  rounded-md ${
            activeTab === "inprogress"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          In-progress Project
        </button>
      </div>
      <div>
        {activeTab === "profile" && (
          <ClientProfile
            profile={clientProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
        {activeTab === "portfolio" && (
          <PortfolioDashboard
            portfolio={clientPortfolio}
            onUpdatePortfolio={handleUpdatePortfolio}
          />
        )}
        {/* {activeTab === "projects" && (
          <ClientProjects
            projects={clientProjects}
            onUpdateProjects={handleUpdateProjects}
          />
        )} */}
        {activeTab === "bids" && <ProjectBids />}
        {activeTab === "inprogress" && <ProjectProgress userData={userData} />}
      </div>
    </div>
  );
};

export default ClientDashboard;
