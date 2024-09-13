// models/CompanyProfile.js
const mongoose = require('mongoose');

const companyProfileSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  industry: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false, // website is optional
  },
  description: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('CompanyProfile', companyProfileSchema);
