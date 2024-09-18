import React, { useState } from "react";

const Addcertificate = () => {
  const [certificateTitle, setCertificateTitle] = useState("");
  const [issuingOrganization, setIssuingOrganization] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !certificateTitle ||
      !issuingOrganization ||
      !issueDate ||
      !certificateId ||
      !description
    ) {
      setMessage("Please fill all required fields");
      return;
    }

    const certificateData = {
      certificateTitle,
      issuingOrganization,
      issueDate,
      certificateId,
      description,
    };

    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(certificateData),
      });

      if (response.ok) {
        console.log(response)
        setMessage("Certificate details uploaded successfully!");
        // Clear the form
        setCertificateTitle("");
        setIssuingOrganization("");
        setIssueDate("");
        setCertificateId("");
        setDescription("");
      } else {
        setMessage("Failed to upload certificate details. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading certificate details:", error);
      setMessage("Failed to upload certificate details. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <a href="/profile">
        <button className="bg-blue-500 text-white p-2 rounded">Back</button>
      </a>
      <h2 className="text-2xl font-bold mb-4">Upload Certificate</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Certificate Title
          </label>
          <input
            type="text"
            value={certificateTitle}
            onChange={(e) => setCertificateTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            placeholder="e.g. Full Stack Developer"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Issuing Organization
          </label>
          <input
            type="text"
            value={issuingOrganization}
            onChange={(e) => setIssuingOrganization(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            placeholder="e.g. Coursera"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date of Issuing
          </label>
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Certificate ID Number
          </label>
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            placeholder="e.g. ABCD1234"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            placeholder="Brief description of the certificate"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default Addcertificate;
