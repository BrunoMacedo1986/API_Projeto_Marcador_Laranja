const express = require('express');
const router = express.Router();

const controller = require('../controllers/figuraController');
const auth = require('../middleware/authMiddleware'); // middleware que valida token

// Todas as rotas usam autenticação
router.post('/', auth, controller.registrar);       // criar registro inicial
router.post('/incrementar', auth, controller.incrementar); // soma pontos
router.get('/', auth, controller.consultar);       // consulta pontos do usuário

module.exports = router;
