import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers"; 
import { LinkedInModule } from "../scdata/deployed_addresses.json";
import { abi } from "../scdata/LinkedIn.json";


const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();

        console.log("Signer Address:", userAddress);

        const instance = new Contract(LinkedInModule, abi, provider);

        // Fetch user certificates from the contract
        const result = await instance.getUserCertificates(userAddress);
        console.log(result);

        // Parse the result into an array of certificates
        const parsedCertificates = [];
        for (let i = 0; i < result.length; i++) {
          const certificate = {
            id: result[i][0],
            title: result[i][1],
            issuer: result[i][2],
            details: result[i][3],
          };
          parsedCertificates.push(certificate);
        }

        setCertificates(parsedCertificates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) return <div>Loading certificates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-5">
      <a href="/profile">
        <button className="bg-blue-500 text-white p-2 rounded">Back</button>
      </a>
      <h1 className="text-2xl font-bold text-center mb-5">User Certificates</h1>
      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">
                Certificate {index + 1}
              </h2>
              <p className="mb-2">
                <strong>ID:</strong> {cert.id}
              </p>
              <p className="mb-2">
                <strong>Title:</strong> {cert.title}
              </p>
              <p className="mb-2">
                <strong>Issuer:</strong> {cert.issuer}
              </p>
              <p className="mb-2">
                <strong>Details:</strong> {cert.details}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No certificates found.</p>
      )}
    </div>
  );
};

export default CertificateList;
