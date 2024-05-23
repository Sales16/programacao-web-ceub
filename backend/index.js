const express = require('express');
const aplicacao = express();

aplicacao.get('/', (req, res) => {
    res.send("Backend OK");
})

aplicacao.post('/', (req, res) => {
    res.send('Banckend OK [POST]');
})

aplicacao.get('/moedas', (req, res) => {
    const moedas = {
        BRL: "Real",
        USD: "Dolar",
        EUR: "Euro"
    }

    res.status(200).json(moedas);
});

aplicacao.post('/moedas', (req, res) => {
    const moedas = {
        BRL: "Real",
        USD: "Dolar",
        EUR: "Euro"
    };

    res.status(200).json(moedas);
});

aplicacao.get('/conversao/:moedas', (req, res) => {
    let moedas = req.params.moedas.split('-');
    let moeda1 = moedas[0];
    let moeda2 = moedas[1];

    const resultado = {
        moedaOrigem: moeda1,
        moedaDestino: moeda2
    };
 
    res.status(200).json(resultado);
});

aplicacao.listen(4000, () => {
    console.log('ouvindo 4000');
});
