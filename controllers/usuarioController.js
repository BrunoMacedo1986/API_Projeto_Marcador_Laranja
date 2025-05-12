const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  const { nomeCrianca, idade, nomeResponsavel, email, senha, dataLeitura, dataAceitacao } = req.body;
  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = new Usuario({ nomeCrianca, idade, nomeResponsavel, email, senhaHash, dataLeitura, dataAceitacao });
    await usuario.save();
    res.status(201).json({ mensagem: 'Usuário registrado' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

  const valido = await bcrypt.compare(senha, usuario.senhaHash);
  if (!valido) return res.status(401).json({ mensagem: 'Senha inválida' });

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
};