const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobs.controller');

// GET /jobs
router.get('/', jobsController.getJobs);

// GET /jobs/detail/:id
router.get('/detail/:id', jobsController.getJobDetail);

module.exports = router;

