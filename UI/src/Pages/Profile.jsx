import React, { useState, useEffect } from "react";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [certificates, setCertificates] = useState([]); // State for certificates
  const [certLoading, setCertLoading] = useState(true);
  const [certError, setCertError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch profile data from API
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setProfileData(data); // Store profile data in state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    // Fetch profile data
    fetchProfileData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        // Fetch certificates from API
        const response = await fetch("/api/certificates", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const certData = await response.json();
        setCertificates(certData); // Store certificates data in state
      } catch (error) {
        setCertError(error.message);
      } finally {
        setCertLoading(false); // Set loading to false once data is fetched
      }
    };

    // Fetch certificates data
    fetchCertificates();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error state

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-700">LinkedIn</div>
          <ul className="flex space-x-8 text-gray-600">
            <li>
              <a href="/home" className="hover:text-blue-700">
                Home
              </a>
            </li>
            <li>
              <a href="/myposts" className="hover:text-blue-700">
                My Posts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Messaging
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Notifications
              </a>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold mb-4">PROFILE</h1>
            <span className="text-gray-700">
              {profileData ? profileData.name : "your name"}
            </span>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <div className="container mx-auto px-4 py-8 flex space-x-8">
        {/* Left Sidebar - Profile Info */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="items-center space-x-4 mb-12">
              <h1 className="text-3xl font-bold mb-4">PROFILE</h1>
              <br />
              <div>
                <h2 className="text-2xl font-semibold">
                  {profileData ? profileData.name.toUpperCase() : "Your name"}
                </h2>
                <p className="text-gray-600">
                  {profileData
                    ? profileData.location.toUpperCase()
                    : "Your location"}
                </p>
                <p className="text-sm text-gray-500">
                  {profileData
                    ? profileData.headline.toUpperCase()
                    : "define you"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 ml-[2%]">
            <a href="/editprofile">
              <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300">
                Edit Profile
              </button>
            </a>
          </div>

          <div className="mt-6">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Open to Work: Fullstack Developer Roles
            </button>
            <a href="/addcer">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md ml-[10%] hover:bg-blue-700">
                Add Certificates
              </button>
            </a>
          </div>

          {/* Certificates Section */}
          <div className="mt-8 border-2 p-2">
            <h3 className="text-xl font-semibold mb-4">Certificates</h3>
            {certLoading ? (
              <div>Loading certificates...</div>
            ) : certError ? (
              <div>Error fetching certificates: {certError}</div>
            ) : certificates.length > 0 ? (
              certificates.map((cert, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold">
                    {cert.certificateTitle} - {cert.issuingOrganization}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Issued on: {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Certificate ID: {cert.certificateId}
                  </p>
                  <p className="text-sm text-gray-500">{cert.description}</p>
                </div>
              ))
            ) : (
              <p>No certificates uploaded yet..</p>
            )}
          </div>

          {/* Skills Section */}
          <div className="mt-8 border-2 p-2">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <ul className="list-disc pl-6 text-gray-700">
              {profileData.skills && profileData.skills.length > 0 ? (
                profileData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))
              ) : (
                <li>No skills listed</li>
              )}
            </ul>
          </div>

          {/* Projects Section */}
          <div className="mt-8 border-2 p-2">
            <h3 className="text-xl font-semibold mb-4">Projects</h3>
            {profileData.projects && profileData.projects.length > 0 ? (
              profileData.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold">
                    Project Title---{project.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Project description---{project.description}
                  </p>
                </div>
              ))
            ) : (
              <p>No projects listed</p>
            )}
          </div>

          {/* Experience Section */}
          <div className="mt-8 border-2 p-2">
            <h3 className="text-xl font-semibold mb-4">Experience</h3>
            {profileData.experience && profileData.experience.length > 0 ? (
              profileData.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold">Role -- {exp.role}</h4>
                  <p className="text-sm text-gray-600">
                    Company --{exp.company}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration --{exp.duration}
                  </p>
                </div>
              ))
            ) : (
              <p>No experience listed</p>
            )}
          </div>
        </div>

        {/* Right Sidebar - Suggestions and Analytics */}
        <div className="w-1/3 space-y-6">
          {/* Suggestions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Suggestions</h2>
            <ul className="list-none">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Follow Company X
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Follow Person Y
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Connect with Z
                </a>
              </li>
            </ul>
          </div>

          {/* Analytics */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <div>
              <p>
                <strong>Profile views:</strong> 123
              </p>
              <p>
                <strong>Post impressions:</strong> 456
              </p>
              <p>
                <strong>Search appearances:</strong> 789
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
