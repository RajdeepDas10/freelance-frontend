import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

export default function PortfolioDashboard() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website",
      description: "Online store for a local business",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Mobile App",
      description: "iOS app for task management",
      status: "Completed",
    },
    {
      id: 3,
      title: "Brand Redesign",
      description: "Logo and brand identity update",
      status: "On Hold",
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    status: "open",
    budget: 1,
    skills: "",
    startDate: "",
    endDate: "",
    paymentType: "fixed",
    duration: "2-4",
  });
  const [projectRating, setProjectRating] = useState({});

  const [projectData, setProjectData] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const addProject = (e) => {
    e.preventDefault();
    if (newProject.title && newProject.description) {
      setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
      setNewProject({ title: "", description: "", status: "In Progress" });
      setShowAddForm(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post(
        `${BASE_URL}/profiles/add/client-project/${userId}`,
        newProject
      );
      console.log("response", response);
      if (response.status === 200) {
        toast.success("Project added successfully!");
        fetchProjects();
        setShowAddForm(false);
        setNewProject({
          title: "",
          description: "",
          status: "open",
          budget: 1,
          skills: "",
          startDate: "",
          endDate: "",
          paymentType: "fixed",
          duration: "2-4",
        });
      }
    } catch (error) {
      toast.error("There was a problem with the fetch operation!");
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const fetchProjects = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/profiles/client-jobs/${userId}/all`
      );
      if (response.data) {
        setProjectData(response.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  console.log("projectData", projectData);

  const handleSubmitReview = async (projectId) => {
    console.log("projectId", projectId);
    console.log("projectRating", projectRating[projectId]);
    console.log("projectRating data ", projectRating);
    if (review.length < 1) {
      alert("Review is required");
      return;
    }
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post(
        `${BASE_URL}/jobs/rate/${userId}/${projectId}`,
        {
          data: {
            rating: rating,
            review: review,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Review submitted successfully!");
        fetchProjects();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Projects</h2>
            <p className="text-3xl font-bold">{projectData?.length}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Open</h2>
            <p className="text-3xl font-bold">
              {projectData?.filter((p) => p.status === "open").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">In Progress</h2>
            <p className="text-3xl font-bold">
              {projectData?.filter((p) => p.status === "in-progress").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Completed</h2>
            <p className="text-3xl font-bold">
              {projectData?.filter((p) => p.status === "completed").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Cancelled</h2>
            <p className="text-3xl font-bold">
              {projectData?.filter((p) => p.status === "cancelled").length}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {showAddForm ? "Cancel" : "Add Project"}
          </button>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleUpload}
            className="bg-white p-6 rounded-lg shadow mb-6"
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Project Title
              </label>
              <input
                type="text"
                id="title"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Project Description
              </label>
              <textarea
                id="description"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Type
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="budgetType"
                    value="fixed"
                    checked={newProject.paymentType === "fixed"}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        paymentType: e.target.value,
                      })
                    }
                  />
                  <span className="ml-2">Fixed</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="budgetType"
                    value="hourly"
                    checked={newProject.paymentType === "hourly"}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        paymentType: e.target.value,
                      })
                    }
                  />
                  <span className="ml-2">Hourly</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Budget (in USD)
              </label>
              <input
                type="number"
                id="budget"
                min={1}
                value={newProject.budget}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    budget: parseInt(e.target.value, 10),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Skills Required
              </label>
              <input
                type="text"
                id="skills"
                value={newProject.skills}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    skills: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Expected Project Duration (in months)
              </label>
              <select
                id="duration"
                value={newProject.duration}
                onChange={(e) =>
                  setNewProject({ ...newProject, duration: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2-4">2-4 months</option>
                <option value="4-6">4-6 months</option>
                <option value="6-8">6-8 months</option>
                <option value="8-10">8-10 months</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Project
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectData?.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <span
                className={`px-2 py-1 rounded text-sm font-semibold ${
                  project.status === "open"
                    ? "bg-blue-100 text-blue-800"
                    : project.status === "in-progress"
                    ? "bg-green-100 text-green-800"
                    : project.status === "completed"
                    ? "bg-yellow-100 text-yellow-800"
                    : project.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {project.status}
              </span>
              {project.status === "completed" && !project.isRated && (
                <div className="mt-4">
                  {project.rating ? (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Rating: {projectRating[project.id]}/5
                      </p>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="rating"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Rate the Freelancer work (out of 5)
                      </label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        placeholder="Write your review here..."
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                      <button
                        // type="submit"

                        onClick={() => handleSubmitReview(project?._id)}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Submit Review
                      </button>
                    </div>
                  )}
                </div>
              )}
              {project.status === "completed" && project.isRated && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Rating: {project?.rating?.rating}/5
                  </p>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Review: {project?.rating?.review}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
