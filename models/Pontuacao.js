const mongoose = require('mongoose');

const pontuacaoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  pontos: { type: Number, default: 0 },
});

module.exports = mongoose.model('Pontuacao', pontuacaoSchema);