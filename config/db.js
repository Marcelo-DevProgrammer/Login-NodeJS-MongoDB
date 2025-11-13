const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://madevhub:Mappe20233@backendcampeonato.oaonq.mongodb.net/LoginSistem?retryWrites=true&w=majority&appName=LoginSistem", {
      serverSelectionTimeoutMS: 30000, // aumenta o tempo limite pra 30 segundos
      socketTimeoutMS: 45000,          // aumenta o tempo do socket
      bufferCommands: false,           // desativa o buffer de comandos
    });

    console.log("✅ Conectado ao MongoDB Atlas!");
  } catch (err) {
    console.error("❌ Erro ao conectar:", err);
  }
}

module.exports = connectDB;
