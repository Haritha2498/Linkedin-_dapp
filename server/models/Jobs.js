const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyProfile', required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  keySkills: [{ type: String, required: true }], // Array of key skills
  postedAt: { type: Date, default: Date.now },
  appliedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Job', jobSchema);
