const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTRAR USUÁRIO =================
exports.registrar = async (req, res) => {
  const {
    nomeCrianca,
    idade,
    nomeResponsavel,
    email,
    senha,
    leitura,
    aceitacao,
  } = req.body;

  if (!nomeCrianca || !idade || !nomeResponsavel || !email || !senha || !leitura || !aceitacao) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  if (aceitacao !== "S") {
    return res.status(400).json({ mensagem: "É necessário aceitar os termos para se registrar." });
  }

  if (leitura !== "S") {
    return res.status(400).json({ mensagem: "É necessário confirmar a leitura das instruções." });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const dataLeitura = leitura === "S" ? new Date() : null;
    const dataAceitacao = aceitacao === "S" ? new Date() : null;

    const usuario = new Usuario({
      nomeCrianca,
      idade,
      nomeResponsavel,
      email,
      senhaHash,
      leitura,
      aceitacao,
      dataLeitura,
      dataAceitacao,
      pontuacaoTotal: 0,
      pontuacaoAcum: 0
    });

    await usuario.save();

    res.status(201).json({
      mensagem: "Usuário registrado",
      usuario: {
        nomeCrianca: usuario.nomeCrianca,
        idade: usuario.idade,
        nomeResponsavel: usuario.nomeResponsavel,
        email: usuario.email,
        pontuacaoTotal: usuario.pontuacaoTotal,
        pontuacaoAcum: usuario.pontuacaoAcum
      }
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// ================= LOGIN USUÁRIO =================
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" });

    if (!usuario.dataAceitacao) {
      return res.status(403).json({ mensagem: "Você precisa aceitar os termos de uso antes de fazer login." });
    }

    const valido = await bcrypt.compare(senha, usuario.senhaHash);
    if (!valido) return res.status(401).json({ mensagem: "Senha inválida" });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.json({
      token,
      usuario: {
        nomeCrianca: usuario.nomeCrianca,
        idade: usuario.idade,
        nomeResponsavel: usuario.nomeResponsavel,
        email: usuario.email,
        pontuacaoTotal: usuario.pontuacaoTotal,
        pontuacaoAcum: usuario.pontuacaoAcum
      }
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// ================= ATUALIZAR USUÁRIO =================
exports.atualizarUsuario = async (req, res) => {
  const { nomeCrianca, idade, nomeResponsavel, email, senha } = req.body;
  const usuarioId = req.usuarioId;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" });

    // Atualiza campos
    if (nomeCrianca) usuario.nomeCrianca = nomeCrianca;
    if (idade) usuario.idade = idade;
    if (nomeResponsavel) usuario.nomeResponsavel = nomeResponsavel;
    if (email) {
      const emailExistente = await Usuario.findOne({ email, _id: { $ne: usuarioId } });
      if (emailExistente) return res.status(400).json({ mensagem: "Este email já está em uso" });
      usuario.email = email;
    }
    if (senha) usuario.senhaHash = await bcrypt.hash(senha, 10);

    await usuario.save();

    res.json({
      mensagem: "Usuário atualizado com sucesso",
      usuario: {
        nomeCrianca: usuario.nomeCrianca,
        idade: usuario.idade,
        nomeResponsavel: usuario.nomeResponsavel,
        email: usuario.email,
        pontuacaoTotal: usuario.pontuacaoTotal,
        pontuacaoAcum: usuario.pontuacaoAcum
      }
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
