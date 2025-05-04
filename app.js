const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar:', err));

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/usuarios', require('./routes/usuarioRoutes'));
app.use('/pontuacao', require('./routes/pontuacaoRoutes'));
app.use('/figuras', require('./routes/figuraRoutes'));
app.use('/upload', require('./routes/uploadRoutes'));

module.exports = app;
