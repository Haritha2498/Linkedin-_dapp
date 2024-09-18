const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateTitle: { 
    type: String, 
    required: true 
  },
  issuingOrganization: { 
    type: String, 
    required: true 
  },
  issueDate: { 
    type: Date, 
    required: true 
  },
  certificateId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },  // Reference to the user who uploaded the certificate
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('Certificate', certificateSchema);
