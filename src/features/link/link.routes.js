// src/features/link/link.route.js
const { Router } = require('express');
const linkController = require('./link.controller');

const router = Router();

// GET /api/link -> Retorna o link atual
router.get('/', linkController.get);

// PUT /api/link -> Atualiza o link
router.put('/', linkController.update);

module.exports = router;