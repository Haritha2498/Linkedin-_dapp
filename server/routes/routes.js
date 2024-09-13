const express = require("express");
const router = express.Router();
const Profile= require("../models/Profile");
const Posts =require("../models/Posts");
const Job = require('../models/Jobs');
const CompanyProfile=require("../models/CompanyProfile")

const verifyToken=require("../middleware/authMiddleware")

router.post('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.userId; 
    let profile = await Profile.findOne({ userId: userId });
    
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { userId: userId }, 
        { $set: req.body }, 
        { new: true, runValidators: true } 
      );
      return res.status(200).json(profile); 
    } else {
      const newProfile = new Profile({
        ...req.body,    
        userId: userId,  
      });
      await newProfile.save(); 
      return res.status(201).json(newProfile); 
    }
  } catch (error) {
    console.error('Error in profile creation/update:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.userId; // Assuming verifyToken sets req.userId

    // Find the profile for the given userId
    const profile = await Profile.findOne({ userId: userId });

    if (!profile) {
      // If no profile found, return a 404 status with an appropriate message
      return res.status(404).json({ message: "Profile not found" });
    }

    // If profile is found, return the profile details
    return res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post('/newpost', verifyToken, async (req, res) => {
  const userId = req.userId; // Assuming verifyToken sets req.userId

  const { title, content } = req.body;

  // Validate the request body
  if ( !title || !content) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Find the user by ID
    let user = await Posts.findOne(userId);

    if (!user) {
      // If user not found, create a new user
      user = new Posts({
        userId: userId,
        posts: [], // Initialize with an empty array of posts
      });
    }

    // Add the new post to the user's posts array
    user.posts.push({
      title,
      content,
    });

    // Save the updated user document
    await user.save();

    // Send a response with the updated user document
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// router.get('/allposts', async (req, res) => {
//   try {
//     // Find all users and populate the posts field
//     const users = await User.find({}, 'posts').exec();

//     // Extract all posts from users
//     const allPosts = users.flatMap(user => user.posts);

//     // Send a response with the array of all posts
//     res.status(200).json(allPosts);
//   } catch (error) {
//     console.error('Error retrieving posts:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

router.get('/myposts', verifyToken, async (req, res) => {
  const userId = req.userId;
    console.log(userId,"werty")
  try {
    // Find the user by ID
    let user = await Posts.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send the user's posts
    res.status(200).json(user.posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/company-profile', verifyToken, async (req, res) => {
  const userId = req.userId; // Assuming verifyToken middleware sets req.userId

  const { companyName, industry, location, website, description } = req.body;

  // Validation
  if (!companyName || !industry || !location || !description) {
    return res.status(400).json({ error: 'All required fields must be filled out' });
  }

  try {
    // Check if a company profile exists for the given userId
    let existingProfile = await CompanyProfile.findOne({ userId });

    if (existingProfile) {
      // If a profile exists, update the profile with new data
      existingProfile.companyName = companyName;
      existingProfile.industry = industry;
      existingProfile.location = location;
      existingProfile.website = website || existingProfile.website; // Update website if provided
      existingProfile.description = description;

      // Save the updated profile
      const updatedProfile = await existingProfile.save();
      return res.status(200).json(updatedProfile); // Send the updated profile in response
    } else {
      // If no profile exists, create a new profile
      const newCompanyProfile = new CompanyProfile({
        userId,         // Associate the profile with the userId
        companyName,
        industry,
        location,
        website,
        description,
      });

      // Save the new profile to the database
      const savedProfile = await newCompanyProfile.save();
      return res.status(201).json(savedProfile); // Send the newly created profile in response
    }
  } catch (error) {
    console.error('Error saving or updating company profile:', error);
    res.status(500).json({ error: 'Failed to save or update company profile' });
  }
});



router.get('/company-profile', verifyToken, async (req, res) => {
  const userId = req.userId; // Assuming verifyToken middleware sets req.userId

  try {
    // Find the company profile by userId
    const companyProfile = await CompanyProfile.findOne({ userId });

    if (!companyProfile) {
      return res.status(404).json({ error: 'Company profile not found' });
    }

    // Return the found company profile
    res.status(200).json(companyProfile);
  } catch (error) {
    console.error('Error retrieving company profile:', error);
    res.status(500).json({ error: 'Failed to retrieve company profile' });
  }
});



router.post('/newjobs', verifyToken, async (req, res) => {
  const { title, description, location, keySkills } = req.body;
  const companyId = req.userId; // Assuming the token contains companyId

  if (!title || !description || !location || !keySkills) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newJob = new Job({
      title,
      companyId,
      description,
      location,
      keySkills,
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});



router.get('/company-jobs',verifyToken, async (req, res) => {
  const companyId= req.userId;
  console.log(companyId)

  try {
    // Find all jobs for the given company ID
    const jobs = await Job.find({ companyId });

    console.log(jobs);
    if (jobs.length === 0) {
      return res.status(404).json({ error: 'No jobs found for this company' });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs for company:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;