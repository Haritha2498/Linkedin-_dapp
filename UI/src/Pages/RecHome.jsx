
import React, { useState, useEffect } from "react";
import Logout from '../Components/Logout'

const RecHome = () => {
  const [companyData, setCompanyData] = useState(null);
  const [jobPostings, setJobPostings] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [recommendedCandidates, setRecommendedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch("/api/company-profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCompanyData({
          name: data.companyName,
          location: data.location,
          industry: data.industry,
          employees: data.website,
          description: data.description,
        });
        setJobPostings(data.jobPostings || []);
        setApplicants(data.applicants || []);

        // Mock recommended candidates data
        const mockRecommendedCandidates = [
          {
            id: 1,
            name: "Sam Wilson",
            skills: "React, Node.js, MongoDB",
            experience: "3 years",
            location: "New York, NY",
          },
          {
            id: 2,
            name: "Alex Taylor",
            skills: "Figma, Sketch, UI/UX Design",
            experience: "5 years",
            location: "Remote",
          },
          {
            id: 3,
            name: "Sara Johnson",
            skills: "Python, Machine Learning, Data Science",
            experience: "4 years",
            location: "San Francisco, CA",
          },
        ];

        setRecommendedCandidates(mockRecommendedCandidates);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);




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







  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-700">
            Recruiter Dashboard
          </div>
          <ul className="flex space-x-8 text-gray-600">
            <li>
              <Logout />
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Home
              </a>
            </li>
            <li>
              <a href="/newjob" className="hover:text-blue-700">
                Post New Job
              </a>
            </li>
            <li>
              <a href="/applicants" className="hover:text-blue-700">
                Applicants
              </a>
            </li>
            <li>
              <a href="/applicants" className="hover:text-blue-700">
                Recommended
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex space-x-8">
          {/* Left Sidebar (Company Profile) */}
          <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-xl font-medium">{companyData.name}</div>
              <p className="text-lg text-gray-600">{companyData.location}</p>
              <p className="text-lg text-gray-600">{companyData.industry}</p>
              <p className="text-lg text-gray-600">{companyData.employees}</p>
              <p className="text-lg text-gray-600">{companyData.description}</p>
              <a href="/recprofile">
                <button className="bg-blue-700 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-800">
                  Edit Profile
                </button>
              </a>
            </div>
          </div>

          {/* Middle Section (Job Postings & Applicants) */}
          <div className="w-1/2">
            {/* Job Postings */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Job Posted Earlier..
              </h2>
              <ul className="space-y-4">
                {jobs.map((job) => (
                  <li
                    key={job.id}
                    className="bg-gray-100 p-4 rounded-md shadow-sm"
                  >
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.location}</p>
                    <p className="text-sm text-gray-600">{job.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applicants */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4">Applicants</h2>
              <ul className="space-y-4">
                {applicants.map((applicant) => (
                  <li
                    key={applicant.id}
                    className="bg-gray-100 p-4 rounded-md shadow-sm"
                  >
                    <h3 className="font-medium">{applicant.name}</h3>
                    <p className="text-sm text-gray-600">
                      Applied for {applicant.appliedFor}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar (Recommended Candidates) */}
          <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Recommended Candidates
            </h2>
            <ul className="space-y-4">
              {recommendedCandidates.map((candidate) => (
                <li
                  key={candidate.id}
                  className="bg-gray-100 p-4 rounded-md shadow-sm"
                >
                  <h3 className="font-medium">{candidate.name}</h3>
                  <p className="text-sm text-gray-600">
                    Skills: {candidate.skills}
                  </p>
                  <p className="text-sm text-gray-600">
                    Experience: {candidate.experience}
                  </p>
                  <p className="text-sm text-gray-600">
                    Location: {candidate.location}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecHome;
