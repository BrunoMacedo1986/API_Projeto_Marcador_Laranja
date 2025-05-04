const express = require('express');
const router = express.Router();
const controller = require('../controllers/figuraController');
const auth = require('../middleware/authMiddleware');

router.use(auth);
router.post('/', controller.criar);
router.get('/', controller.listar);

module.exports = router;