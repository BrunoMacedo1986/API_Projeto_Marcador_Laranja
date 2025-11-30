const Pontuacao = require('../models/Pontuacao');
const Usuario = require('../models/Usuario');

// ================= REGISTRAR PONTUAÇÃO INICIAL =================
exports.registrar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    // Verifica se já existe um documento de pontuação para o usuário
    const existente = await Pontuacao.findOne({ usuarioId });
    if (existente) {
      return res.status(400).json({ mensagem: "Pontuação já existe" });
    }

    // Cria a pontuação inicial
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

    // Incrementa a pontuação na collection Pontuacao (único documento por usuário)
    const pontuacao = await Pontuacao.findOneAndUpdate(
      { usuarioId },
      { $inc: { pontos } },
      { new: true }
    );

    if (!pontuacao) {
      return res.status(404).json({ mensagem: "Pontuação inicial não registrada" });
    }

    // Incrementa também no usuário (se você mantém acumulado lá)
    const usuario = await Usuario.findByIdAndUpdate(
      usuarioId,
      { $inc: { pontuacaoTotal: pontos } },
      { new: true }
    );

    res.json({
      mensagem: "Pontuação incrementada",
      novaPontuacao: pontuacao.pontos,
      pontuacaoAcumUsuario: usuario?.pontuacaoTotal
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// ================= CONSULTAR PONTUAÇÃO =================
exports.consultar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    // Obtem do usuário campos de pontuação
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
