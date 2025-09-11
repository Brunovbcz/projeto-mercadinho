// Consts
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json());

let carrinho = [];

// Rotas API
app.get('/api/carrinho', (req, res) => {
    res.json(carrinho);
});

app.post('/api/carrinho', (req, res) => {
    const { nome, quantidade, preco } = req.body;

    if (!nome || !quantidade || !preco) {
        return res.status(400).json({ erro: 'Dados inválidos' });
    }

    // verifica se já existe no carrinho
    let existente = carrinho.find(item => item.nome === nome);
    if (existente) {
        existente.quantidade += quantidade;
        existente.preco += preco;
    } else {
        carrinho.push({ nome, quantidade, preco });
    }

    res.json(carrinho);
});

app.delete('/api/carrinho/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= carrinho.length) {
        return res.status(400).json({ erro: 'Índice inválido' });
    }

    carrinho.splice(index, 1);
    res.json(carrinho);
});

app.delete('/api/carrinho', (req, res) => {
    carrinho = [];
    res.json({ mensagem: 'Carrinho limpo' });
});

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Listen
app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080: http://localhost:8080');
});
