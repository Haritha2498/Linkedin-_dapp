import React, { useState } from "react";

const RecProfile = () => {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      companyName,
      industry,
      location,
      website,
      description,
    };

    try {
      const res = await fetch("/api/company-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Company profile saved", data);
        alert("Company profile created successfully!");
      } else {
        throw new Error("Failed to create company profile");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error creating company profile. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full bg-gray-100  pt-10 pl-10">
        <a href="/rechome">
          <button className="bg-blue-500 text-white p-2 rounded">Back</button>
        </a>
      </div>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-6">
            Create Company Profile
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Company Name */}
            <div className="mb-4">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            {/* Industry */}
            <div className="mb-4">
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-gray-700"
              >
                Industry
              </label>
              <input
                type="text"
                id="industry"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            {/* Website */}
            <div className="mb-4">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700"
              >
                Website
              </label>
              <input
                type="text"
                id="website"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full h-24"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 rounded-md w-full hover:bg-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecProfile;
