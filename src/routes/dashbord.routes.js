const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getDashboardStats } = require('../controllers/dashboard.controller');

router.use(auth);

router.get('/stats', getDashboardStats);

module.exports = router;
