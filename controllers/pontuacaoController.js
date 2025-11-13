const Pontuacao = require('../models/Pontuacao');
const Pontuacao = require('../models/Usuario');

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
  const { pontos } = req.body;
  const usuarioId = req.usuarioId;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    usuario.pontuacaoTotal += pontos;
    await usuario.save();

    res.json({
      mensagem: "Pontuação atualizada",
      pontuacaoTotal: usuario.pontuacaoTotal
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.consultar = async (req, res) => {
  const usuarioId = req.usuarioId;
  const usuario = await Usuario.findById(usuarioId);

  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  res.json({
    pontuacaoTotal: usuario.pontuacaoTotal
  });
};
