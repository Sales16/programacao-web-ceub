const express = require('express');
const aplicacao = express();

aplicacao.get('/', (req, res) => {
    res.send("Backend OK");
})

aplicacao.post('/', (req, res) => {
    res.send('Banckend OK [POST]');
})

aplicacao.listen(4000, () => {
    console.log('ouvindo 4000');
});
