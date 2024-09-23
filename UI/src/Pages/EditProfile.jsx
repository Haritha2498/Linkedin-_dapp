import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import { abi } from "../scdata/LinkedIn.json";
import {  LinkedInModule} from "../scdata/deployed_addresses.json";
import { useNavigate } from "react-router-dom";




const EditProfile = () => {

//connection to metamask
  const provider = new BrowserProvider(window.ethereum);
  async function connentToMetamask() {
    const signer = await provider.getSigner();
    console.log("signer", signer.address);
    alert(`MetaMask is connected. Address: ${signer.address}`);
  }

  const navigate = useNavigate;

  // Initial state for the form data
  const [profileData, setProfileData] = useState({
    name: "",
    headline: "",
    location:"",
    about: "",
    skills: [""], 
    projects: [{ title: "", description: "" }],
    experience: [{ company: "", role: "", duration: "" }],
  });

  // Handler for updating form inputs
  const handleInputChange = (e, index, section) => {
    const { name, value } = e.target;
    if (section) {
      const newSection = [...profileData[section]];
      newSection[index][name] = value;
      setProfileData({
        ...profileData,
        [section]: newSection,
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  // Handler for updating individual skills
  const handleSkillChange = (e, index) => {
    const newSkills = [...profileData.skills];
    newSkills[index] = e.target.value;
    setProfileData({
      ...profileData,
      skills: newSkills,
    });
  };

  // Handler for adding new project/experience/skill
  const handleAdd = (section) => {
    const newSection = [...profileData[section]];
    if (section === "skills") {
      newSection.push(""); 
    } else {
      newSection.push({
        title: "",
        description: "",
        company: "",
        role: "",
        duration: "",
      });
    }
    setProfileData({
      ...profileData,
      [section]: newSection,
    });
  };

  // Handler for removing project/experience/skill
  const handleRemove = (index, section) => {
    const newSection = profileData[section].filter((_, i) => i !== index);
    setProfileData({
      ...profileData,
      [section]: newSection,
    });
  };


const saveProfile = async () => {
  

    const signer=await provider.getSigner();
    const data = {
      name: profileData.name,
      headline: profileData.headline,
      location: profileData.location,
      skill: profileData.skills
    };
    console.log(data);


const instance = new Contract(LinkedInModule, abi, signer);
 console.log(data);
const txl = await instance.createProfile(data.name,data.headline,data.location,data.skill);
 console.log(data);
console.log("transaction details:", txl);

 console.log(data);
try {
  console.log("profile", profileData);
  const response = await fetch("/api/profile", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(profileData), 
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Profile saved successfully:", data);
    navigate("/profile")
  } else {
    console.error("Failed to save profile:", response.statusText);
    
  }
} catch (error) {
  console.error("An error occurred while saving the profile:", error);
}
};


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
      <a href="/profile">
        <button className="bg-blue-500 text-white p-2 rounded">Back</button>
      </a>

      <button
        type="submit"
        className="w-[15%] h-14 mt-4 ml-10 border-2 bg-blue-500 float-right text-white rounded-lg hover:bg-violet-400"
        onClick={connentToMetamask}
      >
        connect to metamask
      </button>


      {/* Personal Details */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Personal Details</h2>
        <div className="mt-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profileData.name}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
          />
          <input
            type="text"
            name="headline"
            placeholder="Headline"
            value={profileData.headline}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
          />
          <input
            type="text"
            name="location"
            placeholder="current location"
            value={profileData.location}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
          />

          <textarea
            name="about"
            placeholder="About you"
            value={profileData.about}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
          />
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Skills</h2>
        {profileData.skills.map((skill, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              placeholder="Skill"
              value={skill}
              onChange={(e) => handleSkillChange(e, index)} 
              className="border p-2 w-full"
            />
            <button
              onClick={() => handleRemove(index, "skills")}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={() => handleAdd("skills")} className="text-blue-500">
          + Add Skill
        </button>
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        {profileData.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) => handleInputChange(e, index, "projects")}
              className="border p-2 w-full mb-2"
            />
            <textarea
              name="description"
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => handleInputChange(e, index, "projects")}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={() => handleRemove(index, "projects")}
              className="text-red-500"
            >
              Remove Project
            </button>
          </div>
        ))}
        <button onClick={() => handleAdd("projects")} className="text-blue-500">
          + Add Project
        </button>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Experience</h2>
        {profileData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleInputChange(e, index, "experience")}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={exp.role}
              onChange={(e) => handleInputChange(e, index, "experience")}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => handleInputChange(e, index, "experience")}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={() => handleRemove(index, "experience")}
              className="text-red-500"
            >
              Remove Experience
            </button>
          </div>
        ))}
        <button
          onClick={() => handleAdd("experience")}
          className="text-blue-500"
        >
          + Add Experience
        </button>
      </div>

      <button
        onClick={saveProfile}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Save Profile
      </button>
    </div>
  );
};

export default EditProfile;
