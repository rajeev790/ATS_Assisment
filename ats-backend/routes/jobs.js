const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Job = require('../models/Job');

// Create a job post
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('salary', 'Salary is required').isNumeric(),
      check('responsibilities', 'Responsibilities are required').not().isEmpty(),
      check('requirements', 'Requirements are required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, location, salary, responsibilities, requirements, r1CheckForm } = req.body;

    try {
      const newJob = new Job({
        title,
        location,
        salary,
        responsibilities,
        requirements,
        r1CheckForm,
        employerId: req.user.id,
      });

      const job = await newJob.save();
      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get all job posts for coordinator
router.get('/coordinator', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'pending' });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Approve and post a job
router.put('/approve/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    job.status = 'approved';
    job.coordinatorId = req.user.id;
    await job.save();

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Assign recruiters to a job
router.put('/assign/:id', auth, async (req, res) => {
  try {
    const { recruiterIds, r2CheckForm } = req.body;
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    job.recruiterIds = recruiterIds;
    job.r2CheckForm = r2CheckForm;
    job.status = 'live';
    await job.save();

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;