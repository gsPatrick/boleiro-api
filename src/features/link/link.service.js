// src/features/link/link.service.js
const Link = require('../../models/Link');

// Como teremos apenas UM link, vamos sempre buscar pelo ID 1
const LINK_ID = 1;

const getLink = async () => {
  const link = await Link.findByPk(LINK_ID);
  if (!link) {
    // Se o link não existir, cria um com o valor padrão
    return Link.create({ id: LINK_ID });
  }
  return link;
};

const updateLink = async (newUrl) => {
  const link = await Link.findByPk(LINK_ID);
  if (!link) {
    throw new Error('Link não encontrado. Crie um primeiro.');
  }
  link.url = newUrl;
  await link.save();
  return link;
};

module.exports = {
  getLink,
  updateLink,
};