const Usuario = require('../models/Usuario');

// Registrar pontuação inicial para novo usuário
exports.registrar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId || req.body.usuarioId;
    if (!usuarioId) {
      return res.status(400).json({ mensagem: 'Usuário não informado' });
    }

    const existente = await Pontuacao.findOne({ usuarioId });
    if (existente) {
      return res.status(400).json({ mensagem: 'Pontuação já existe' });
    }

    const nova = new Pontuacao({ usuarioId, pontos: 0 });
    await nova.save();

    res.status(201).json(nova);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


/// Incrementar pontos acumulados
exports.incrementar = async (req, res) => {
  try {
    const { pontos } = req.body;
    const usuarioId = req.body.usuarioId || req.usuarioId;

    if (!usuarioId) {
      return res.status(400).json({ mensagem: 'Usuário não informado' });
    }

    let pontuacao = await Pontuacao.findOne({ usuarioId });

    // Se não existir registro, criar um
    if (!pontuacao) {
      pontuacao = new Pontuacao({
        usuarioId,
        pontos: 0
      });
    }

    pontuacao.pontos += pontos;
    pontuacao.atualizadoEm = new Date();

    await pontuacao.save();

    res.json({
      mensagem: "Pontuação atualizada",
      pontos: pontuacao.pontos
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


/// Consultar pontuação acumulada
exports.consultar = async (req, res) => {
  try {
    const usuarioId = req.query.usuarioId || req.usuarioId;

    if (!usuarioId) {
      return res.status(400).json({ mensagem: "Usuário não informado" });
    }

    const pontuacao = await Pontuacao.findOne({ usuarioId });

    res.json({
      pontos: pontuacao ? pontuacao.pontos : 0
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
