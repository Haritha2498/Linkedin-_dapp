const mongoose = require('mongoose');

// Define the schema for the projects
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Define the schema for the experience
const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

// Define the main profile schema
const profileSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true,
    },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  skills: {
    type: [String],  // Array of strings for skills
  },
  projects: [projectSchema],  // Array of project objects
  experience: [experienceSchema],  // Array of experience objects
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
