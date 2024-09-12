// models/Personagem.js
const mongoose = require("mongoose");

const personagemSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
});

module.exports = mongoose.model("Personagem", personagemSchema);
