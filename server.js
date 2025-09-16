// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
const mainRouter = require('./src/routes');

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middlewares
app.use(cors({
  origin: '*',             // Libera para qualquer origem
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'], // Libera todos métodos
  allowedHeaders: ['Content-Type', 'Authorization']          // Libera cabeçalhos principais
}));
app.use(express.json());

// Rota principal da API
app.use('/api', mainRouter);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o PostgreSQL estabelecida com sucesso.');
    
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados com o banco de dados.');

    const linkService = require('./src/features/link/link.service');
    await linkService.getLink();
    console.log('Link inicial garantido no banco de dados.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
};

startServer();
