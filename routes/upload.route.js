const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const authMiddleware = require('../middleware/auth.middleware');
router.post(
  '/',
  authMiddleware,
  uploadController.upload.single('file'),
  uploadController.uploadFile,
);

module.exports = router;
