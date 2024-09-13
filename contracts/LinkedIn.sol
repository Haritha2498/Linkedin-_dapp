

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LinkedIn {
    
    // Struct to store user profile data
    struct UserProfile {
        string username;
        string headline;
        string location;
        address userAddress;
        string[] skills; 
    }
    
    // Struct to store job postings
    struct Job {
        string title;
        string location;
        string[] keySkills; // Key skills required for the job
        address companyAddress; // The recruiter or company who posted the job
        uint256 postedAt; // Timestamp when job was posted
    }
    
 
    mapping(address => UserProfile) public userProfiles; // Map user's wallet address to their profile
    mapping(uint256 => Job) public jobs; // Map job ID to the job
    uint256 public jobCount = 0; // Counter to track job postings
    
    // Event to signal new user profile creation
    event UserProfileCreated(address indexed userAddress, string username);
    
    // Event to signal new job posting creation
    event JobPosted(uint256 indexed jobId, string title, address indexed companyAddress);

    // Function to create a user profile
    function createProfile(
        string memory _username, 
        string memory _headline, 
        string memory _location, 
        string[] memory _skills
    ) public {
        userProfiles[msg.sender] = UserProfile({
            username: _username,
            headline: _headline,
            location: _location,
            userAddress: msg.sender,
            skills: _skills
            
        });

        // Emit event for profile creation
        emit UserProfileCreated(msg.sender, _username);
    }
    
    // Function to add a job posting
    function addJob(
        string memory _title,  
        string memory _location, 
        string[] memory _keySkills
    ) public {
        jobs[jobCount] = Job({
            title: _title,
            location: _location,
            keySkills: _keySkills,
            companyAddress: msg.sender,
            postedAt: block.timestamp
        });
        
        // Emit event for job posting
        emit JobPosted(jobCount, _title, msg.sender);
        
        // Increment the job count
        jobCount++;
    }

    // Function to get a user's profile by address
    function getUserProfile(address _userAddress) public view returns (
        string memory, string memory, string memory, string[] memory
    ) {
        UserProfile memory profile = userProfiles[_userAddress];
        return (
            profile.username,
            profile.headline,
            profile.location,
            profile.skills
        );
    }

    // Function to get job details by job ID
    function getJob(uint256 _jobId) public view returns (
        string memory, string memory, string[] memory, address, uint256
    ) {
        Job memory job = jobs[_jobId];
        return (
            job.title,
            job.location,
            job.keySkills,
            job.companyAddress,
            job.postedAt
        );
    }
}
