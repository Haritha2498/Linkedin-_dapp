import React, { useState, useEffect } from "react";
import { abi } from "../scdata/LinkedIn.json"; // Your contract's ABI
import { BrowserProvider, Contract } from "ethers";
import { LinkedInModule } from "../scdata/deployed_addresses.json"; // Deployed contract address

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("Signer Address:", userAddress);

        const instance = new Contract(LinkedInModule, abi, provider);

        // Get the number of jobs posted by the company
        const jobCount = await instance.getCompanyJobCount(userAddress);
        console.log("Number of Posted Jobs:", jobCount);

        const fetchedJobs = [];

        // Fetch each job using the getCompanyJob function
        for (let i = 0; i < jobCount; i++) {
          const job = await instance.getCompanyJob(userAddress, i);
          console.log(job);
          fetchedJobs.push({
            title: job[0],
            location: job[1],
            keySkills: job[2]
          });
        }

        setJobs(fetchedJobs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <a href="/rechome">
        <button className="bg-blue-500 border-2 text-white p-4 rounded-lg hover:bg-violet-400 ml-10 mt-10">
          Back
        </button>
      </a>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Jobs Posted by You</h1>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-2xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">Location: {job.location}</p>
                <p className="text-gray-500">
                  Posted on:{job.po}
                  {/* {new Date(job.postedAt * 1000).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })} */}
                </p>
                <p className="text-gray-500">Key Skills: {job.keySkills}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default PostedJobs;
