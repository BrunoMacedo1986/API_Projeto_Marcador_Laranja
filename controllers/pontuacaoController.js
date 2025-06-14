const Pontuacao = require('../models/Pontuacao');

exports.registrar = async (req, res) => {
  const existente = await Pontuacao.findOne({ usuarioId: req.usuarioId });
  if (existente) return res.status(400).json({ mensagem: 'Pontuação já existe' });

  const nova = new Pontuacao({ usuarioId: req.usuarioId, pontos: 0 });
  await nova.save();
  res.status(201).json(nova);
};

exports.incrementar = async (req, res) => {
  const pontuacao = await Pontuacao.findOneAndUpdate(
    { usuarioId: req.usuarioId },
    { $inc: { pontos: 10 } },
    { new: true }
  );
  if (!pontuacao) return res.status(404).json({ mensagem: 'Pontuação não encontrada' });
  res.json(pontuacao);
};

exports.consultar = async (req, res) => {
  const pontuacao = await Pontuacao.findOne({ usuarioId: req.usuarioId });
  res.json(pontuacao);
};