const mongoose = require('mongoose');

const figuraSchema = new mongoose.Schema({
  codigo: String,
  descricao: String,
  imagem: String, // Nome do arquivo salvo
});

module.exports = mongoose.model('Figura', figuraSchema);