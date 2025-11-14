const express = require('express');
const router = express.Router();

const pontuacaoController = require('../controllers/pontuacaoController');
const auth = require('../middleware/authMiddleware');

// Registrar pontuação inicial (opcional – usado quando um usuário é criado)
router.post('/registrar', auth, pontuacaoController.registrar);

// Incrementar pontos
router.post('/incrementar', auth, pontuacaoController.incrementar);

// Consultar pontos acumulados
router.get('/', auth, pontuacaoController.consultar);

module.exports = router;
