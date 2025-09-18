// Consts
const express = require('express');
const app = express();
const connection = require('./models/db');
const util = require('util');
const path = require('path');
const { error } = require('console');
const query = util.promisify(connection.query).bind(connection);

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json());

app.get('/carrinho', async (req, res) => {
    try {
        const resutlts = await query('SELECT * FROM carrinho')
        res.json(resutlts)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

app.get('/produtos/:id', async (req, res) => {
    const {id} = req.params;

    let produto = getProduto();
});

app.get('/produtos', async (req, res) => {
    try {
        const resutlts = await query('SELECT * FROM produtos')
        res.json(resutlts)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

app.post('/carrinho', async (req, res) => {
    const { nome, quantidade, preco } = req.body;

    if (!nome || !quantidade || !preco) {
        return res.status(400).json({ erro: 'Dados inválidos' });
    }
    const id_prod = await getProdutoId(nome);

    // verifica se já existe no carrinho
    const existente = await query("SELECT * FROM carrinho WHERE id_produto = ?", [id_prod]);
    
    if (existente.length > 0) {
        
        let response = await query("UPDATE carrinho SET quantidade = ? WHERE id_produto = ?", [quantidade, id_prod])
    } else {
        let response = await query("INSERT INTO carrinho (id_produto, quantidade) VALUES (?, ?)", [id_prod, quantidade])
    }
    const carrinho = await query("SELECT * FROM carrinho");

    res.json(carrinho);
});

app.delete('carrinho', (req, res) => {
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

async function getProduto(idProduto) {
    let response = await query("SELECT * FROM produtos WHERE id = ?", [idProduto]);
    return response[0];
}

async function getProdutoId(nomeProduto) {
    let response = await query("SELECT id FROM produtos WHERE nome = ?", [nomeProduto]);
    return response[0].id;
}