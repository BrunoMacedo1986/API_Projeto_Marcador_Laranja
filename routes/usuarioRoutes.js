const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuarioController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registrar", controller.registrar);
router.post("/login", controller.login);
router.put("/atualizar", authMiddleware, controller.atualizarUsuario);

module.exports = router;
