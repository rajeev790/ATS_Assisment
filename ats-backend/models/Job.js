const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  responsibilities: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  r1CheckForm: [
    {
      question: String,
      answer: Boolean,
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'approved', 'live'],
    default: 'pending',
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  coordinatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  recruiterIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});
module.exports = mongoose.model('Job', JobSchema);

