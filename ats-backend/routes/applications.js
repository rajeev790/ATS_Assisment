const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Application = require('../models/Application');
const Job = require('../models/Job');

// Apply for a job
router.post(
  '/:jobId',
  auth,
  async (req, res) => {
    const { resume, r1CheckResponses } = req.body;

    try {
      const job = await Job.findById(req.params.jobId);
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }

      const newApplication = new Application({
        candidateId: req.user.id,
        jobId: req.params.jobId,
        resume,
        r1CheckResponses,
      });

      const application = await newApplication.save();
      res.json(application);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get applications for recruiter
router.get('/recruiter', auth, async (req, res) => {
  try {
    const applications = await Application.find({ status: 'pending' }).populate('jobId');
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Review an application
router.put('/review/:id', auth, async (req, res) => {
  const { r2CheckResponses } = req.body;

  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    application.r2CheckResponses = r2CheckResponses;
    application.status = 'reviewed';
    await application.save();

    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Shortlist an application
router.put('/shortlist/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    application.status = 'shortlisted';
    await application.save();

    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;