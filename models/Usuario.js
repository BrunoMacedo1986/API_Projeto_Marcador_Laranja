const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nomeCrianca: String,
  idade: Number,
  nomeResponsavel: String,
  email: { type: String, unique: true },
  senhaHash: String,
  dataAceitacao: {
    type: Date,
    default: null

  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);