// src/routes/index.js
const { Router } = require('express');
const linkRoutes = require('../features/link/link.route');

const router = Router();

router.use('/link', linkRoutes);

module.exports = router;