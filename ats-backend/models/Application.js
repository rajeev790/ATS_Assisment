const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
  resume: {
    type: String,
  },
  r1CheckResponses: [
    {
      question: String,
      response: Boolean,
    },
  ],
  r2CheckResponses: [
    {
      question: String,
      response: Boolean,
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Application', ApplicationSchema);
