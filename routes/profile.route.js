const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.put('/volunteer', authMiddleware, profileController.updateVolunteer);
router.put('/companies', authMiddleware, profileController.updateCompanies);

module.exports = router;
