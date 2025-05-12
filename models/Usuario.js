const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nomeCrianca: String,
  idade: Number,
  nomeResponsavel: String,
  email: { type: String, unique: true },
  senhaHash: String,
  leitura: { type: String, enum: ['S', 'N'], required: true },
  aceitacao: { type: String, enum: ['S', 'N'], required: true },
  dataLeitura: { type: Date },
  dataAceitacao: { type: Date }
});

module.exports = mongoose.model('Usuario', usuarioSchema);