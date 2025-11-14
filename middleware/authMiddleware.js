const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

//module.exports = (req, res, next) => {
 // const token = req.headers.authorization?.split(' ')[1];
 // if (!token) return res.status(401).json({ mensagem: 'Token ausente' });

 // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
 //   if (err) return res.status(403).json({ mensagem: 'Token inválido' });
 //   req.usuarioId = decoded.id;
 //   next();
 // });
//};

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id; // assume que o token contém { id: <usuarioId> }
    next();
  } catch (err) {
    res.status(401).json({ mensagem: 'Token inválido' });
  }
};

