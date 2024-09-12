// routes/postRoutes.js
const express = require("express");
const router = express.Router();
const Personagem = require("../models/Personagem");

// Rota POST para criar um novo personagem
router.post("/personagens/add", async (req, res) => {
    try {
        const { nome, descricao } = req.body;
        const novoPersonagem = new Personagem({ nome, descricao });
        await novoPersonagem.save();
        res.redirect("/personagens"); // Redireciona para a página de personagens após adicionar
    } catch (err) {
        console.error("Erro ao adicionar personagem:", err);
        res.status(500).send("Erro ao adicionar personagem.");
    }
});

module.exports = router;
