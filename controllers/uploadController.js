exports.uploadImagem = (req, res) => {
    if (!req.file) return res.status(400).json({ erro: 'Imagem não enviada' });
    res.json({ imagem: req.file.filename });
  };  