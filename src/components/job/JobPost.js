import React, { useState } from "react";
import axios from "axios";

const JobPost = ({ history }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const { title, description, budget, deadline } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    try {
      await axios.post("/api/job", formData, config);
      history.push("/jobs");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a Job</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              name="title"
              value={title}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="mt-1 p-2 w-full border rounded"
              name="description"
              value={description}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Budget</label>
            <input
              type="number"
              className="mt-1 p-2 w-full border rounded"
              name="budget"
              value={budget}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Deadline</label>
            <input
              type="date"
              className="mt-1 p-2 w-full border rounded"
              name="deadline"
              value={deadline}
              onChange={onChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPost;
