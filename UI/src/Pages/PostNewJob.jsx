import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostNewJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [keySkills, setKeySkills] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/newjobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          location,
          keySkills: keySkills.split(",").map((skill) => skill.trim()), // Convert to array
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post job");
      }

      alert("Job posted successfully");
      navigate("/rechome");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <>
      <a href="/rechome">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-24 hover:bg-blue-700">
          BACK
        </button>
      </a>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>

          <div className="mb-4">
            <label className="block mb-2">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Key Skills (comma separated)</label>
            <input
              type="text"
              value={keySkills}
              onChange={(e) => setKeySkills(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Post Job
          </button>
        </form>
      </div>
    </>
  );
};

export default PostNewJob;
