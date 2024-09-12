// routes/getRoutes.js
const express = require("express");
const router = express.Router();
const Personagem = require("../models/Personagem");

// Rota GET para listar todos os personagens
router.get("/personagens", async (req, res) => {
    try {
        const personagens = await Personagem.find();
        res.status(200).json(personagens);
    } catch (err) {
        res.status(500).json({
            mensagem: "Erro ao buscar os personagens",
            erro: err.message,
        });
    }
});

module.exports = router;
