import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "../Components/Logout";

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          navigate("/editprofile")
        }

        const data = await response.json();
        console.log(data, "data");
        setProfileData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData(); 
  }, []); 
  const handlePostSubmit = async () => {
    try {
      
      const response = await fetch("/api/newpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: postTitle,
          content: postContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data, "Post created");
       window.alert("Post created successfully!");
      setPostTitle("");
      setPostContent("");
    } catch (error) {
      console.error("Failed to create post:", error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>; 


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-700">LinkedIn</div>
          <ul className="flex space-x-8 text-gray-600">
            <li>
              <Logout />
              
            </li>
            <li>
              <a href="/myposts" className="hover:text-blue-700">
                My Posts
              </a>
            </li>
            <li>
              <a href="/myjobs" className="hover:text-blue-700">
                Jobs
              </a>
            </li>
            
            <li>
              <a href="/myjobs" className="hover:text-blue-700">
                Notifications
              </a>
            </li>
          </ul>
          
        </div>
      </nav>

      {/* Main Section */}
      <div className="container mx-auto px-4 py-8 flex space-x-8">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Profile Info</h2>
          <div className="flex flex-col items-center space-y-2">
            <img
              className="w-20 h-20 rounded-full object-cover"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
            <h3 className="text-lg font-medium">
              {profileData ? profileData.name.toUpperCase() : "Create profile"}
            </h3>
            <p className="text-gray-600">
              {profileData
                ? profileData.location.toUpperCase()
                : "Your location"}
            </p>
            <p className="text-sm text-gray-600">
              <p className="text-sm text-gray-500">
                {profileData
                  ? profileData.headline.toUpperCase()
                  : "define you"}
              </p>
            </p>
            <a href="/profile" className="hover:text-blue-700">
              <button className="bg-blue-700 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-800">
                View Profile
              </button>
            </a>
          </div>
        </div>

        {/* Feed Section */}
        <div className="w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Create a Post</h2>

            {/* Post Title */}
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              placeholder="Post Title"
            />

            {/* Post Content */}
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full h-24 p-2 border border-gray-300 rounded-md"
              placeholder="What’s on your mind?"
            ></textarea>

            {/* Post Button */}
            <button
              onClick={handlePostSubmit}
              className="bg-blue-700 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-800"
            >
              Post
            </button>
          </div>

          {/* Feed */}
          <div className="space-y-6">
            {/* Post 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://via.placeholder.com/150"
                  alt="User"
                />
                <div>
                  <h3 className="font-medium text-gray-800">Jane Smith</h3>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                Excited to share my new project with the world! Check it out on
                GitHub.
              </p>
              <div className="mt-4 flex space-x-4 text-gray-600">
                <button className="hover:text-blue-700">Like</button>
                <button className="hover:text-blue-700">Comment</button>
                <button className="hover:text-blue-700">Share</button>
              </div>
            </div>

            {/* Post 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://via.placeholder.com/150"
                  alt="User"
                />
                <div>
                  <h3 className="font-medium text-gray-800">Mark Johnson</h3>
                  <p className="text-sm text-gray-500">4 hours ago</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                Just landed a new job at XYZ Corp. Super excited to start the
                next chapter!
              </p>
              <div className="mt-4 flex space-x-4 text-gray-600">
                <button className="hover:text-blue-700">Like</button>
                <button className="hover:text-blue-700">Comment</button>
                <button className="hover:text-blue-700">Share</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-4">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src="https://via.placeholder.com/150"
                alt="User"
              />
              <div>
                <h3 className="font-medium text-gray-800">Anna Williams</h3>
                <p className="text-sm text-gray-500">
                  Software Engineer at Google
                </p>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src="https://via.placeholder.com/150"
                alt="User"
              />
              <div>
                <h3 className="font-medium text-gray-800">David Brown</h3>
                <p className="text-sm text-gray-500">
                  Product Manager at Facebook
                </p>
              </div>
            </li>
          </ul>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-md mt-6 hover:bg-blue-800 w-full">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
