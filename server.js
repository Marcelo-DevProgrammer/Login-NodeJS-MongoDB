const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const routes = require('./api/routes/index');
const dotenv = require('dotenv')
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://login-node-js-mongo-db.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(bodyParser.json());
require('dotenv').config();


// Função principal
async function startServer() {
  try {
    await connectDB(); // só continua se conectar
    console.log('✅ Conectado ao MongoDB');

    app.get('/', (req, res) => {
      res.send("Bem-vindo! Sistema de login feito por Marcelo 😎");
    });

    // Rotas da API
    app.use('/api', routes);

    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`🚀 Servidor rodando na porta ${port}`));
  } catch (err) {
    console.error('❌ Falha ao iniciar o servidor:', err);
  }
}

startServer();
