import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config";

const ProjectProgress = ({ userData }) => {
  const [projects, setProjects] = useState([]);

  const fetchInProgressProjects = async (userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/profiles/in-progress-projects/${userId}`
      );
      if (!response) {
        throw new Error("Network response was not ok");
      }
      console.log("121 response", response);
      setProjects(response?.data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleCompleteProject = async (projectId) => {
    console.log("121 projectId", projectId);
    try {
      const response = await axios.put(
        `${BASE_URL}/profiles/complete-client-job/${projectId}`
      );
      if (!response) {
        throw new Error("Network response was not ok");
      }
      alert("Project completed successfully");
      fetchInProgressProjects(userData?._id);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchInProgressProjects(userData?._id);
  }, [userData?._id]);

  console.log("121 projects", projects);

  return (
    <div className="bg-white  rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        Project Details
      </h2>
      {projects?.map((project, index) => (
        <div key={index} className="bg-white shadow-lg rounded-xl p-8 w-fit">
          <div className="flex flex-col space-y-6 w-full">
            <div className="flex flex-col space-y-6 w-full">
              <div className="flex w-full items-center justify-start gap-2">
                <label className=" text-base font-semibold text-gray-800 ">
                  Project Name :
                </label>
                <p className="mt-1  rounded-lg  shadow-sm ">{project?.title}</p>
              </div>
              <div className="flex w-full items-center justify-start gap-2">
                <label className=" text-base font-semibold text-gray-800 ">
                  Project Description :
                </label>
                <p className="mt-1 rounded-lg  shadow-sm ">
                  {project?.description}
                </p>
              </div>
              <div className="flex w-full items-center justify-start gap-2">
                <label className=" text-base font-semibold text-gray-800 ">
                  Project skills :
                </label>
                <p className="mt-1 rounded-lg  shadow-sm ">{project?.skills}</p>
              </div>
              <div className="flex w-full items-center justify-start gap-2">
                <label className=" text-base font-semibold text-gray-800 ">
                  Project Duration :
                </label>
                <p className="mt-1 rounded-lg  shadow-sm ">
                  {project?.duration}
                </p>
              </div>
              <div className="flex w-full items-center justify-start gap-2">
                <label className=" text-base font-semibold text-gray-800 ">
                  Project Budget :
                </label>
                <p className="mt-1 rounded-lg  shadow-sm ">{project?.budget}</p>
              </div>
              <div className="flex w-full items-center justify-start gap-2">
                <label className=" text-base font-semibold text-gray-800 ">
                  Project Status :
                </label>
                <p className="mt-1  rounded-lg  shadow-sm ">{project.status}</p>
              </div>
            </div>
            <button
              className="w-[50%]  bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
              onClick={() => handleCompleteProject(project?._id)}
            >
              Complete
            </button>
          </div>
        </div>
      ))}

      {projects?.length === 0 && (
        <p className="text-center text-2xl font-semibold">
          No In Progress Projects found
        </p>
      )}
    </div>
  );
};

export default ProjectProgress;
