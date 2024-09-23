import React from 'react'

const First = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-700">LinkedIn</div>
          
          <a href="/sign-up">
            <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800">
              Sign Up
            </button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Your Professional Community
          </h1>
          <p className="text-lg mb-8">
            Connect with professionals, grow your network, and find job
            opportunities.
          </p>
          <a href="/login">
            <button className="bg-white text-blue-700 px-6 py-3 rounded-md hover:bg-gray-200">
              Get Started
            </button>
          </a>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Grow Your Network</h2>
              <p className="text-gray-600 mb-6">
                Connect with colleagues, classmates, and friends to expand your
                professional network.
              </p>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                Learn More
              </button>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Find Job Opportunities
              </h2>
              <p className="text-gray-600 mb-6">
                Explore jobs that match your skills and apply to the ones that
                interest you.
              </p>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                Learn More
              </button>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
              <p className="text-gray-600 mb-6">
                Follow industry news and stay updated with the latest
                professional trends.
              </p>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-[10%]">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 LinkedIn Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default First