const bcrypt = require('bcrypt');
const User = require('../models/userModel');

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Verifica campos obrigatórios
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Verifica se email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria e salva o usuário
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('❌ Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

module.exports = { registerUser };
