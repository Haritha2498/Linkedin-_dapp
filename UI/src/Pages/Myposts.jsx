import React, { useState, useEffect } from "react";

const Myposts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from API
        const response = await fetch("/api/myposts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Include any necessary authentication headers
            // "Authorization": `Bearer ${yourToken}`
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data); // Store posts in state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchPosts(); // Call the function to fetch posts
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error state

  return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      <a href="/home">
        <button className="bg-blue-500 text-white p-2 rounded">Back</button>
      </a>
      <h1 className="text-2xl font-bold mb-6">My Posts</h1>
      <div className="space-y-6">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md w-6/12 "
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700">{post.content}</p>
              <p className="mt-2 text-sm text-gray-500">
                Date: {post.createdAt}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Myposts;
