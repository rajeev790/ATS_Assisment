const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['candidate', 'coordinator', 'recruiter', 'employer'],
  },
  contactInfo: {
    phone: String,
    address: String,
  },
});

module.exports = mongoose.model('User', UserSchema);