// routes/userRoutes.js
const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { getMe } = require('../controllers/userController');

const router = express.Router();

router.get('/me', authenticateToken, getMe);

module.exports = router;
