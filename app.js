const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get("/", (req, res) => {
  res.send("API Busca CEP ONLINE ✅ - use /cep/01001000");
});

app.get("/cep/:cep", async (req, res) => {
  const cep = req.params.cep.replace(/\D/g, "");

  if (cep.length !== 8) {
    return res.status(400).json({ erro: "CEP inválido" });
  }

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();

  if (data.erro) {
    return res.status(404).json({ erro: "CEP não encontrado" });
  }

  res.json(data);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando...");
});
