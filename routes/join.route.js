const express = require('express');
const router = express.Router();
const joinController = require('../controllers/join.controller');

// POST /join/companies - 기업 회원가입
router.post('/companies', joinController.companiesJoin);

// POST /join/volunteer - 일반 유저 회원가입
router.post('/volunteer', joinController.volunteerJoin);

module.exports = router;

