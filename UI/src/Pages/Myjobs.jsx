import React, { useState, useEffect } from "react";

const Myjobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userid,setuserid] = useState('')

  // Fetch job postings on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs"); // Assuming you have an API route `/api/jobs`
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        console.log(data.user_id)
        setuserid(data.user_id);
        console.log(userid,"jokl");
        setJobs(data.jobs); // Set the jobs in state
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

 const handleApply = async (jobId) => {
  try {
    const response = await fetch("/api/applyjob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ jobId }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success) {
      alert(`You have successfully applied for the job with ID: ${jobId}`);
    } else {
      alert(`Failed to apply for the job. Reason: ${data.message}`);
    }
  } catch (error) {
    console.error("Error applying for the job:", error);
    alert("An error occurred while applying for the job. Please try again.");
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <a href="/home">
        <button className="bg-blue-500 text-white p-2 rounded mt-10 ml-10">Back</button>
      </a>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-2">Location: {job.location}</p>
                <p className="text-gray-600 mb-2">
                  Description: {job.description}
                </p>
                <p className="text-gray-600 mb-4">
                  Key Skills: {job.keySkills.join(", ")}
                </p>
                <button
                  onClick={() => handleApply(job._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">No Jobs Posted Yet</h2>
            <p className="text-gray-600">Check back later for job postings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Myjobs;
