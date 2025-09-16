// src/features/link/link.controller.js
const linkService = require('./link.service');

const get = async (req, res) => {
  try {
    const link = await linkService.getLink();
    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o link.' });
  }
};

const update = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: 'URL é obrigatória.' });
    }
    const updatedLink = await linkService.updateLink(url);
    res.status(200).json(updatedLink);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o link.' });
  }
};

module.exports = {
  get,
  update,
};