const mongoose = require('mongoose');

const figuraSchema = new mongoose.Schema({
  codigo: String,
  descricao: String,
  imagem: String, // Nome do arquivo salvo
  caracteristica1: String,
  caracteristica2: String,
  caracteristica3: String
});

module.exports = mongoose.model('Figura', figuraSchema);