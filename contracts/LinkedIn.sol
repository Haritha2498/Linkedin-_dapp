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

    }

    struct Certificate {
        string certificateId;
        string certificateTitle;
        string issuingOrganization;
        string description;
    }

    mapping(address => UserProfile) public userProfiles;
    mapping(address => Job[]) public companyJobs; 
    mapping(address => Certificate[]) public userCertificates; // Stores certificates for each user

    event UserProfileCreated(address indexed userAddress, string username);
    event JobPosted(address indexed companyAddress, string title);
    event CertificateAdded(address indexed userAddress, string certificateId, string certificateTitle);

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

        emit UserProfileCreated(msg.sender, _username);
    }
    
    // Function to add a job posting for the calling company
    function addJob(
        string memory _title,  
        string memory _location, 
        string[] memory _keySkills
    ) public {
        Job memory newJob = Job({
            title: _title,
            location: _location,
            keySkills: _keySkills
        });

        companyJobs[msg.sender].push(newJob);

        emit JobPosted(msg.sender, _title);
    }

    // Function to get a user profile
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

    // Function to add a certificate to a user's profile
    function addCertificate(
        string memory _certificateId,
        string memory _certificateTitle,
        string memory _issuingOrganization,
        string memory _description
    ) public {
        require(bytes(_certificateId).length > 0, "Certificate ID cannot be empty");
        require(bytes(_certificateTitle).length > 0, "Certificate Title cannot be empty");

        Certificate memory newCertificate = Certificate({
            certificateId: _certificateId,
            certificateTitle: _certificateTitle,
            issuingOrganization: _issuingOrganization,
            description: _description
        });

        userCertificates[msg.sender].push(newCertificate);

        emit CertificateAdded(msg.sender, _certificateId, _certificateTitle);
    }

    // Function to get all certificates of a user
    function getUserCertificates(address _userAddress) public view returns (Certificate[] memory) {
        return userCertificates[_userAddress];
    }

    function getCompanyJob(address _companyAddress, uint256 _index) public view returns (
        string memory, string memory, string[] memory
    ) {
        Job memory job = companyJobs[_companyAddress][_index];
        return (
            job.title,
            job.location,
            job.keySkills
            
        );
    }

    // Function to get the number of jobs posted by a specific company
    function getCompanyJobCount(address _companyAddress) public view returns (uint256) {
        return companyJobs[_companyAddress].length;
    }
}
