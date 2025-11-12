const Pontuacao = require('../models/Pontuacao');

exports.registrar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId || req.body.usuarioId; // pegar do middleware ou do body
    if (!usuarioId) return res.status(400).json({ mensagem: 'Usuário não informado' });

    const existente = await Pontuacao.findOne({ usuarioId });
    if (existente) 
      return res.status(400).json({ mensagem: 'Pontuação já existe' });

    const nova = new Pontuacao({ usuarioId, pontos: 0 });
    await nova.save();
    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.incrementar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId || req.body.usuarioId;
    const { pontos } = req.body;

    if (!usuarioId) return res.status(400).json({ mensagem: 'Usuário não informado' });
    if (pontos == null) return res.status(400).json({ mensagem: 'Informe os pontos' });

    const pontuacao = await Pontuacao.findOneAndUpdate(
      { usuarioId },
      { $inc: { pontos: pontos } },
      { new: true, upsert: true } // upsert cria se não existir
    );

    res.json(pontuacao);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.consultar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId || req.query.usuarioId;
    if (!usuarioId) return res.status(400).json({ mensagem: 'Usuário não informado' });

    const pontuacao = await Pontuacao.findOne({ usuarioId });
    if (!pontuacao)
      return res.status(404).json({ mensagem: 'Pontuação não encontrada' });

    res.json(pontuacao);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
