import React, { useState, useEffect } from "react";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch certificate data when the component mounts
    const fetchCertificates = async () => {
      try {
        const response = await fetch("/api/certificates", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching certificates: ${response.status}`);
        }

        const certData = await response.json();
        setCertificates(certData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return <div>Loading certificates...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <a href="/profile">
        <button className="bg-blue-500 text-white p-2 rounded ml-10 mt-10">Back</button>
      </a>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Certificates</h1>

        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div key={index} className="bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-2xl font-semibold">
                  {cert.certificateTitle}
                </h2>
                <p className="text-gray-600">
                  Issuing Organization: {cert.issuingOrganization}
                </p>
                <p className="text-gray-500">
                  Issued on: {new Date(cert.issueDate).toLocaleDateString()}
                </p>
                {cert.certificateId && (
                  <p className="text-gray-500">ID: {cert.certificateId}</p>
                )}
                {cert.description && (
                  <p className="mt-4 text-gray-700">{cert.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No certificates found.</p>
        )}
      </div>
    </div>
  );
};

export default Certificates;
