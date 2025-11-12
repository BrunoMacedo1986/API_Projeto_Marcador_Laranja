const express = require('express');
const router = express.Router();
const controller = require('../controllers/figuraController');
const auth = require('../middleware/authMiddleware');

router.post('/', controller.registrar); // criar registro inicial
router.post('/incrementar', controller.incrementar); // soma pontos
router.get('/', controller.consultar); // consulta pontos do usuário

module.exports = router;