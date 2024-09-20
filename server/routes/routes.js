const express = require("express");
const router = express.Router();
const Profile= require("../models/Profile");
const Posts =require("../models/Posts");
const Job = require('../models/Jobs');
const CompanyProfile=require("../models/CompanyProfile");
const Certificate=require("../models/Certificate")


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
    const userId = req.userId; 

    const profile = await Profile.findOne({ userId: userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ error: "Server error" });
  }
});


router.get('/profile/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const profile = await Profile.findOne({ userId: userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post('/newpost', verifyToken, async (req, res) => {
  const { userId } = req.userId; 

  const { title, content } = req.body;


  if ( !title || !content) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    
    let user = await Posts.findOne(userId);

    if (!user) {
      user = new Posts({
        userId: userId,
        posts: [], 
      });
    }

    user.posts.push({
      title,
      content,
    });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



router.get('/myposts', verifyToken, async (req, res) => {
  const userId = req.userId;
    console.log(userId,"werty")
  try {
    let user = await Posts.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/company-profile', verifyToken, async (req, res) => {
  const userId = req.userId; 

  const { companyName, industry, location, website, description } = req.body;

  if (!companyName || !industry || !location || !description) {
    return res.status(400).json({ error: 'All required fields must be filled out' });
  }

  try {
    let existingProfile = await CompanyProfile.findOne({ userId });

    if (existingProfile) {
      existingProfile.companyName = companyName;
      existingProfile.industry = industry;
      existingProfile.location = location;
      existingProfile.website = website || existingProfile.website; 
      existingProfile.description = description;

      const updatedProfile = await existingProfile.save();
      return res.status(200).json(updatedProfile); 
    } else {
      const newCompanyProfile = new CompanyProfile({
        userId,         
        companyName,
        industry,
        location,
        website,
        description,
      });

      const savedProfile = await newCompanyProfile.save();
      return res.status(201).json(savedProfile); 
    }
  } catch (error) {
    console.error('Error saving or updating company profile:', error);
    res.status(500).json({ error: 'Failed to save or update company profile' });
  }
});



router.get('/company-profile', verifyToken, async (req, res) => {
  const userId = req.userId; 

  try {
    
    const companyProfile = await CompanyProfile.findOne({ userId });

    if (!companyProfile) {
      return res.status(404).json({ error: 'Company profile not found' });
    }

    res.status(200).json(companyProfile);
  } catch (error) {
    console.error('Error retrieving company profile:', error);
    res.status(500).json({ error: 'Failed to retrieve company profile' });
  }
});



router.post('/newjobs', verifyToken, async (req, res) => {
  const { title, description, location, keySkills } = req.body;
  const companyId = req.userId; 

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



router.get('/jobs',verifyToken, async (req, res) => {
  try {
    const user_id=req.userId;
    console.log("from jobss")
    console.log(user_id);
    const jobs = await Job.find();

    if (jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found' });
    }
    res.status(200).json({ jobs, user_id });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




router.post('/certificates', verifyToken, async (req, res) => {
  try {
    const { certificateTitle, issuingOrganization, issueDate, certificateId, description } = req.body;

    if (!certificateTitle || !issuingOrganization || !issueDate || !certificateId || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const userId = req.userId; 

    const newCertificate = new Certificate({
      certificateTitle,
      issuingOrganization,
      issueDate,
      certificateId,
      description,
      userId
    });


    const savedCertificate = await newCertificate.save();

    res.status(201).json(savedCertificate);
  } catch (error) {
    console.error('Error saving certificate:', error);
    res.status(500).json({ error: 'Failed to save certificate' });
  }
});


router.get("/certificates", verifyToken, async (req, res) => {
  try {
    const certificates = await Certificate.find({ userId: req.userId });

    if (!certificates) {
      return res.status(404).json({ message: "No certificates found" });
    }

    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



router.post('/applyjobs', verifyToken, async (req, res) => {
  const { jobId } = req.body;
  const userId = req.userId;

  if (!jobId || !userId) {
    return res.status(400).json({ error: 'Job ID and Candidate ID are required' });
  }

  try {

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }


    if (!job.appliedCandidates.includes(userId)) {
      job.appliedCandidates.push(userId);
    }


    await job.save();

    res.status(200).json({ success: true, message: 'Candidate added successfully', job });
  } catch (error) {
    console.error('Error updating applied candidates:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;