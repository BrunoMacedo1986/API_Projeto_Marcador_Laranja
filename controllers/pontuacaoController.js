const Pontuacao = require('../models/Pontuacao');
const Usuario = require('../models/Usuario');

// ================= REGISTRAR PONTUAÇÃO INICIAL =================
exports.registrar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    const existente = await Pontuacao.findOne({ usuarioId });
    if (existente) {
      return res.status(400).json({ mensagem: "Pontuação já existe" });
    }

    const nova = new Pontuacao({ usuarioId, pontos: 0 });
    await nova.save();

    return res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// ================= INCREMENTAR PONTUAÇÃO =================
exports.incrementar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const { pontos } = req.body;

    if (pontos === undefined) {
      return res.status(400).json({ mensagem: "Informe os pontos" });
    }

    // Atualiza os campos pontuacaoTotal e pontuacaoAcum do usuário
      const usuario = await Usuario.findByIdAndUpdate(
      usuarioId,
      { $inc: { pontuacaoAcum: pontos } },
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    // Registrar histórico na collection Pontuacao
    await Pontuacao.create({ usuarioId, pontos });

    res.json({
      mensagem: "Pontuação atualizada",
      pontuacaoTotal: usuario.pontuacaoTotal ?? 0,
      pontuacaoAcum: usuario.pontuacaoAcum
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// ================= CONSULTAR PONTUAÇÃO =================
exports.consultar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json({
      pontuacaoTotal: usuario.pontuacaoTotal,
      pontuacaoAcum: usuario.pontuacaoAcum
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
