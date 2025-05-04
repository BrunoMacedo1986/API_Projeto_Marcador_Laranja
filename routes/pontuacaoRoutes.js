const express = require('express');
const router = express.Router();
const controller = require('../controllers/pontuacaoController');
const auth = require('../middleware/authMiddleware');

router.use(auth);
router.post('/', controller.registrar);
router.post('/incrementar', controller.incrementar);
router.get('/', controller.consultar);

module.exports = router;