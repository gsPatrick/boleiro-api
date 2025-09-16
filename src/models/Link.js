// src/models/Link.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Link = sequelize.define('Link', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'https://wa.me/5551999999999' // Um link padrão
  }
}, {
  tableName: 'links',
  timestamps: false
});

module.exports = Link;