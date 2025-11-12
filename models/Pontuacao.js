const mongoose = require('mongoose');

const pontuacaoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true, unique: true },
  pontos: { type: Number, default: 0 },
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pontuacao', pontuacaoSchema);