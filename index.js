// Consts
const express = require('express');
const app = express();
const path = require('path');

//Use
app.use(express.static(path.join(__dirname, 'src')));

//Get
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

//Listen
app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080: http://localhost:8080');
});
