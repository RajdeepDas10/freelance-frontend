import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientDashboard from "../../components/clientProfile/dashboard";
import axios from "axios";
import { BASE_URL } from "../../config";

const JobCard = ({
  title,
  company,
  budget,
  duration,
  description,
  userdata,
  handleViewDetails,
  _id,
  selectedJob,
  handleApply,
  applyForJob,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{company}</p>
    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
      <span className="flex items-center">💰 {budget}</span>
      <span className="flex items-center">🕒 {duration} months</span>
    </div>
    <p className="text-gray-700">{description}</p>
    {userdata?.role !== "client" && userdata && (
      <button
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
        onClick={() => {
          // const amount = prompt("Enter the amount you want to Bid:");
          // if (amount) {
          //   applyForJob(_id, amount);
          // }
          handleViewDetails(_id);
        }}
      >
        Apply Now
      </button>
    )}

    <button
      className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 ml-5"
      onClick={() => handleViewDetails(selectedJob?._id === _id ? null : _id)}
    >
      {selectedJob?._id === _id ? "Hide Details" : "View Details"}
    </button>
    {selectedJob?._id === _id && (
      <div className="mt-4">
        <p className="text-gray-700">Title: {selectedJob.title}</p>
        <p className="text-gray-700">Company: {selectedJob.company}</p>
        <p className="text-gray-700">Budget: {selectedJob.budget}</p>
        <p className="text-gray-700">Duration: {selectedJob.duration} months</p>
        <p className="text-gray-700">Description: {selectedJob.description}</p>
      </div>
    )}
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [userdata, setUserData] = useState(null);
  const [token, setToken] = useState();
  const [AllprojectData, setAllprojects] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleViewDetails = (id) => {
    navigate(`/job-details/${id}`);
    // if (id) {
    //   const filteredJob = AllprojectData.find((project) => project._id === id);
    //   setSelectedJob(filteredJob);
    // } else {
    //   setSelectedJob(null);
    // }
  };

  console.log("selectedJob", selectedJob);

  console.log("getuserData", userdata);

  const featuredJobs = [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "TechCorp Inc.",
      rate: "$50-$70/hr",
      duration: "3-6 months",
      description:
        "We're looking for an experienced full stack developer to join our team and help build cutting-edge web applications.",
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "DesignPro Agency",
      rate: "$40-$60/hr",
      duration: "2-3 months",
      description:
        "Seeking a creative UX/UI designer to help design intuitive and visually appealing interfaces for our clients.",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "DataDriven Co.",
      rate: "$60-$80/hr",
      duration: "4-6 months",
      description:
        "We need a skilled data scientist to analyze large datasets and provide actionable insights for our business.",
    },
  ];

  const applyForJob = async (id, amount) => {
    try {
      //  "/jobs/bid/:jobId/:amount/:userid"
      const response = await axios.get(
        `http://localhost:5000/api/jobs/bid/${id}/${amount}/${userdata?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
      // Optionally, update the state or perform other actions based on the response
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  const getProject = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/jobs/get/all/projects`);

      setAllprojects(response.data.data);
      console.log(response.data);
      // Optionally, update the state or perform other actions based on the response
    } catch (error) {
      console.error("Error posting project:", error);
    }
  };

  const handleNavigate = (url) => {
    navigate(url);
  };
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    const getuserData = localStorage.getItem("freelanceuser");
    if (getuserData) {
      setUserData(JSON.parse(getuserData));
    }
    if (getToken) {
      setToken(getToken);
    }
  }, []);

  useEffect(() => {
    getProject();
  }, []);

  console.log("AllprojectData", AllprojectData);

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <header className="bg-blue-600 text-white">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Next Freelance Opportunity
            </h1>
            <p className="text-xl mb-8">
              Connect with top clients and work on exciting projects
            </p>
            {/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                placeholder="Search for jobs..."
                className="flex-grow py-3 px-4 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center justify-center">
                🔍 Search Jobs
              </button>
            </div> */}
          </div>
        </header>

        {/* Featured Jobs Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Featured Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AllprojectData.length > 0 ? (
              AllprojectData?.map((job) => (
                <JobCard
                  key={job.id}
                  {...job}
                  userdata={userdata}
                  handleViewDetails={handleViewDetails}
                  selectedJob={selectedJob}
                  applyForJob={applyForJob}
                />
              ))
            ) : (
              <span className="text-center">No project available</span>
            )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
              Why Choose Our Platform
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-semibold mb-2">
                  Top-tier Projects
                </h3>
                <p className="text-gray-600">
                  Access a wide range of high-quality projects from reputable
                  clients.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">
                  Competitive Rates
                </h3>
                <p className="text-gray-600">
                  Set your own rates and earn what you deserve for your skills
                  and experience.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🕒</div>
                <h3 className="text-xl font-semibold mb-2">
                  Flexible Schedule
                </h3>
                <p className="text-gray-600">
                  Work on your own terms and create a schedule that fits your
                  lifestyle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Freelancing?
            </h2>
            <p className="text-xl mb-8">
              Join our community of skilled professionals and find your next
              opportunity today.
            </p>
            {!userdata && (
              <button
                onClick={() => handleNavigate("/signup")}
                className="bg-white text-blue-600 py-3 px-8 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Sign Up Now
              </button>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
