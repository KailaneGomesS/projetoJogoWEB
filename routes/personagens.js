// routes/personagens.js
const express = require("express");
const router = express.Router();
const Personagem = require("../models/Personagem");

// Rota para exibir todos os personagens
router.get("/", async (req, res) => {
  try {
    const personagens = await Personagem.find(); // Busca todos os personagens
    res.render("personagens", { personagens }); // Passa a lista de personagens para a view
  } catch (err) {
    console.error("Erro ao buscar personagens:", err);
    res.status(500).send("Erro interno do servidor");
  }
});

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
