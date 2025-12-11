const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const authMiddleware = require('../middleware/auth.middleware');
const uploadMiddleware = require('../middleware/upload.middleware');

router.post('/', authMiddleware, uploadMiddleware, uploadController.uploadFile);

module.exports = router;
