
import React, { useState, useEffect } from "react";

const Applicants = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [candidateDetails, setCandidateDetails] = useState({});

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      try {
        const response = await fetch(`/api/company-jobs`);
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyJobs();
  }, []);

  const handleShowCandidates = (job) => {
    setSelectedJob(job);
  };

  // Fetch candidate details by ID
  const getDetails = async (candidateId) => {
    try {
      const response = await fetch(`/api/profile/${candidateId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch candidate details");
      }
      const data = await response.json();
      console.log(data);
      setCandidateDetails((prevDetails) => ({
        ...prevDetails,
        [candidateId]: data, // Store details by candidateId
      }));
    } catch (error) {
      console.error("Error fetching candidate details:", error);
      setCandidateDetails((prevDetails) => ({
        ...prevDetails,
        [candidateId]: "Error fetching details",
      }));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-1/2">
      <a href="/rechome">
        <button className="bg-blue-500 border-2 text-white p-4 rounded-lg hover:bg-violet-400 ml-10 mt-10">
          Back
        </button>
      </a>
      {/* Job Postings */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Job Postings</h2>
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job._id} className="bg-gray-100 p-4 rounded-md shadow-sm">
              <h3 className="font-medium">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-sm text-gray-600">{job.description}</p>
              <button
                onClick={() => handleShowCandidates(job)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                List of Applied Candidates
              </button>

              {selectedJob === job && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md shadow-sm">
                  <h4 className="text-lg font-semibold mb-2">
                    Applied Candidates
                  </h4>
                  {job.appliedCandidates && job.appliedCandidates.length > 0 ? (
                    <ul className="list-disc pl-6 text-gray-700">
                      {job.appliedCandidates.map((candidateId, index) => (
                        <li key={index}>
                          {/* Fetch candidate details on click */}
                          <button
                            onClick={() => getDetails(candidateId)}
                            className="text-blue-500 underline"
                          >
                            Candidate ID: {candidateId}
                          </button>

                          {/* Display candidate details if available */}
                          {candidateDetails[candidateId] ? (
                            <div className="mt-2 text-gray-600">
                              {typeof candidateDetails[candidateId] ===
                              "string" ? (
                                <p>{candidateDetails[candidateId]}</p>
                              ) : (
                                <p>
                                  Name: {candidateDetails[candidateId].name}
                                  <br />
                                  About: {candidateDetails[candidateId].headline}
                                  <br />
                                  Skills:{" "}
                                  {candidateDetails[candidateId].skills.join(
                                    ", "
                                  )}
                                </p>
                              )}
                            </div>
                          ) : (
                            <p>Click to fetch details</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No candidates have applied for this job yet.</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Applicants;

