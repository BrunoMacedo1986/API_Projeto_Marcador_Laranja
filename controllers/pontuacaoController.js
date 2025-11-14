const Pontuacao = require('../models/Pontuacao');
const Usuario = require('../models/Usuario');


// Criar registro inicial de pontuação (opcional)
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


// Incrementar pontos no usuário
exports.incrementar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const { pontos } = req.body;

    if (!pontos) {
      return res.status(400).json({ mensagem: "Informe os pontos" });
    }

    // Atualiza a pontuação acumulada do usuário
    const usuario = await Usuario.findByIdAndUpdate(
      usuarioId,
      { $inc: { pontuacaoTotal: pontos } },
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    // Registrar histórico no collection Pontuacao
    await Pontuacao.create({
      usuarioId,
      pontos
    });

    res.json({
      mensagem: "Pontuação atualizada",
      pontuacaoTotal: usuario.pontuacaoTotal
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Consultar pontuação acumulada
exports.consultar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json({
      pontuacaoTotal: usuario.pontuacaoTotal
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
