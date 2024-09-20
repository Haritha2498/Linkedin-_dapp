import React, { useState } from "react";
import { useEffect } from "react";
import { abi } from "../scdata/LinkedIn.json";
import { BrowserProvider, Contract } from "ethers";
import { LinkedInModule } from "../scdata/deployed_addresses.json";

const Get = () => {
  const [student, setStudent] = useState([]);

  const provider = new BrowserProvider(window.ethereum);
  useEffect(() => {
    const fetchstudentdetails = async () => {
      try {
        const signer = await provider.getSigner();

        const userAddress = await signer.getAddress();
        console.log("Signer Address:", userAddress);

        console.log(signer.address);
        const instance = new Contract(LinkedInModule, abi, provider);
        
        const result = await instance.getUserProfile(userAddress);
        
        setStudent(result);
        console.log(result[0]);
        // const res=await fetch(`http://localhost:3004/api/form/${id}`);
        // const data=await res.json()
        // console.log(data);
        // setStudent(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchstudentdetails();
  }, []);

  return (
    <>
      <p>
        user details {student}</p>
    </>
  );
};

export default Get;




// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { abi } from "../scdata/LinkedIn.json";
// import { LinkedInModule } from "../scdata/deployed_addresses.json";

// const Get = () => {
//   const [student, setStudent] = useState([]);

//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       try {
//         if (window.ethereum) {
//           console.log("cxvbn")
//           const provider = new ethers.providers.Web3Provider(window.ethereum);
//           console.log("cxvbn");
//           const signer = provider.getSigner();
//           console.log("cxvbn");
//           const userAddress = await signer.getAddress(); 
//           console.log("cxvbn");// Get the current user's address
//           console.log("Signer Address:", userAddress);

//           const instance = new ethers.Contract(LinkedInModule, abi, provider);

//           // Fetch user certificates using the user's address
//           const result = await instance.getUserCertificates(userAddress);
//           setStudent(result);
//           console.log("User Certificates:", result);
//         } else {
//           console.error("Ethereum provider is not available.");
//         }
//       } catch (error) {
//         console.error("Error fetching student details:", error);
//       }
//     };

//     fetchStudentDetails();
//   }, []);

//   return (
//     <div>
//       <h1>User Certificates</h1>
//       {student}
//     </div>
//   );
// };

// export default Get;

