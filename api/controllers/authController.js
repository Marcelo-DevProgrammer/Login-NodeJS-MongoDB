const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Login
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ email: user.email }, 'secret');
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar dados do usuário autenticado
const getUserData = async (req, res) => {
  try {
    const { email } = req.query; // pega da URL

    if (!email) {
      return res.status(400).json({ error: 'O email é obrigatório na query' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.status(200).json({
      username: user.username,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { login, getUserData };
