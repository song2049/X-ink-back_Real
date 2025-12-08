const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /auth/login
router.post('/volunteer-login', authController.login);
router.post('/companies-login', authController.companiesLogin); // 기업 로그인

module.exports = router;
