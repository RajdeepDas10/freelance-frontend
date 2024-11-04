import axios from "axios";
import React, { useState } from "react";
// import { Plus, Trash2, Clock, DollarSign } from "lucide-react";

const ClientProjects = ({ projects, onUpdateProjects }) => {
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    budget: "",
    skills: "",
    userId: "",
    duration: "",
  });

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      onUpdateProjects([
        ...projects,
        { ...newProject, id: Date.now(), status: "Open" },
      ]);
      setNewProject({ title: "", description: "", budget: "", deadline: "" });
    }

    const postProject = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/projects",
          newProject
        );
        console.log(response.data);
        // Optionally, update the state or perform other actions based on the response
      } catch (error) {
        console.error("Error posting project:", error);
      }
    };
  };

  const handleDeleteProject = (id) => {
    onUpdateProjects(projects.filter((project) => project.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  return (
    <div className="bg-white shadow-md w-full rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Client Projects</h2>
      <div className="space-y-4 w-full flex flex-wrap justify-start items-center gap-4">
        {projects.map((project) => (
          <div key={project.id} className="border w-[30%] rounded-lg p-4">
            <h3 className="font-bold text-lg">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
            <div className="mt-2 flex items-center space-x-4">
              <span className="flex items-center">
                {/* <DollarSign size={16} className="mr-1" /> */}
                {project.budget}
              </span>
              <span className="flex items-center">
                {/* <Clock size={16} className="mr-1" /> */}
                {project.deadline}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  project.status === "Open"
                    ? "bg-green-200 text-green-800"
                    : project.status === "In Progress"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-blue-200 text-blue-800"
                }`}
              >
                {project.status}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">{project.skills}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="mt-2 flex items-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                {/* <Trash2 size={16} className="mr-1" /> */}
                Delete
              </button>
              <button className="mt-2 flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Closed
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Add New Project</h3>
        <div className="space-y-2">
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="title"
            placeholder="Project Title"
            value={newProject.title}
            onChange={handleInputChange}
          />
          <textarea
            className="w-full px-3 py-2 border rounded-md"
            name="description"
            placeholder="Project Description"
            value={newProject.description}
            onChange={handleInputChange}
          ></textarea>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="budget"
            placeholder="Budget"
            value={newProject.budget}
            onChange={handleInputChange}
          />
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="skills"
            placeholder="Skills"
            value={newProject.skills}
            onChange={handleInputChange}
          />
          <button
            onClick={handleAddProject}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {/* <Plus className="mr-2" /> */}
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientProjects;
