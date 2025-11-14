const Figura = require('../models/Figura'); // supondo que você tenha um modelo Figura
const Usuario = require('../models/Usuario');

// Registrar pontuação inicial ou criar registro inicial de figura
exports.registrar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    // Verifica se já existe registro para este usuário
    let figura = await Figura.findOne({ usuario: usuarioId });
    if (figura) {
      return res.status(400).json({ mensagem: 'Registro já existe para este usuário.' });
    }

    figura = new Figura({
      usuario: usuarioId,
      pontos: 0,
    });

    await figura.save();
    res.status(201).json({ mensagem: 'Registro criado com sucesso', figura });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Incrementar pontos
exports.incrementar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const { pontos } = req.body;

    if (!pontos || typeof pontos !== 'number') {
      return res.status(400).json({ mensagem: 'Informe um valor válido de pontos.' });
    }

    const figura = await Figura.findOne({ usuario: usuarioId });
    if (!figura) {
      return res.status(404).json({ mensagem: 'Registro do usuário não encontrado.' });
    }

    figura.pontos += pontos;
    await figura.save();

    res.json({ mensagem: 'Pontuação atualizada', pontos: figura.pontos });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Consultar pontos acumulados
exports.consultar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    const figura = await Figura.findOne({ usuario: usuarioId });
    if (!figura) {
      return res.status(404).json({ mensagem: 'Registro do usuário não encontrado.' });
    }

    res.json({ pontos: figura.pontos });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
