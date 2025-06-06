const Figura = require('../models/Figura');

exports.criar = async (req, res) => {
  const { codigo, descricao, imagem, caracteristica1, caracteristica2, caracteristica3 } = req.body;
  const figura = new Figura({ codigo, descricao, imagem, caracteristica1, caracteristica2, caracteristica3 });
  await figura.save();
  res.status(201).json(figura);
};

exports.listar = async (req, res) => {
  const figuras = await Figura.find();
  res.json(figuras);
};