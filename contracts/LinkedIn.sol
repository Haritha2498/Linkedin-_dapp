
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LinkedIn {
    
    
    struct UserProfile {
        string username;
        string headline;
        string location;
        address userAddress;
        string[] skills; 
    }
    

    struct Job {
        string title;
        string location;
        string[] keySkills; 
        address companyAddress; 
        uint256 postedAt;
    }
    
 
    mapping(address => UserProfile) public userProfiles;
    mapping(uint256 => Job) public jobs; 
    uint256 public jobCount = 0; 
    

    event UserProfileCreated(address indexed userAddress, string username);
    

    event JobPosted(uint256 indexed jobId, string title, address indexed companyAddress);


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
        

        emit JobPosted(jobCount, _title, msg.sender);
        

        jobCount++;
    }


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
