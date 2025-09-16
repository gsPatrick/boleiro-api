// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
const mainRouter = require('./src/routes');

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middlewares
app.use(cors()); // Permite requisições de outras origens (ex: seu frontend)
app.use(express.json()); // Permite que o express entenda JSON no corpo das requisições

// Rota principal da API
app.use('/api', mainRouter);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o PostgreSQL estabelecida com sucesso.');
    
    // Sincroniza os modelos com o banco de dados.
    // `force: false` para não apagar os dados existentes.
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados com o banco de dados.');

    // Inicia o serviço para garantir que o link ID 1 exista
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