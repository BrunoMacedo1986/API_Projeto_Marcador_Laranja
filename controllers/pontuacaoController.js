const Pontuacao = require('../models/Pontuacao');

exports.registrar = async (req, res) => {
  try {
  const existente = await Pontuacao.findOne({ usuarioId: req.usuarioId });
  if (existente) 
    return res.status(400).json({ mensagem: 'Pontuação já existe' });

  const nova = new Pontuacao({ usuarioId: req.usuarioId, pontos: 0 });
  await nova.save();
  res.status(201).json(nova);
} catch (err) {
  res.status(500).json({ erro: err.message });
}
};

exports.incrementar = async (req, res) => {
  try {
  const {pontos} = req.body;
  if (pontos == null) return res.status(400).json({mensagem: 'Informe os pontos'});
  const pontuacao = await Pontuacao.findOneAndUpdate(
    { usuarioId: req.usuarioId },
    { $inc: { pontos: pontos } },
    { new: true }
  );
  if (!pontuacao) 
    return res.status(404).json({ mensagem: 'Pontuação não encontrada' });
  res.json(pontuacao);
} catch (err) {
  res.status(500).json({ erro: err.message });
}
};

exports.consultar = async (req, res) => {
  try {
  const pontuacao = await Pontuacao.findOne({ usuarioId: req.usuarioId });
  if (!pontuacao)
    return res.status(404),json({ mensagem: 'Pontuação não encontrada'});
  res.json(pontuacao);
} catch (err) {
  res.status(500).json({ erro: err.message });
}
};