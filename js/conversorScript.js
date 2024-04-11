let valoresConversao = {
    real: {
        dolar: 0.27,
        euro: 0.18,
        real: 1
    },
    dolar: {
        real: 5.03,
        euro: 1.09,
        dolar: 1
    },
    euro: {
        real: 5.47,
        dolar: 0.92,
        euro: 1
    }
}
let botaoEnter = document.querySelector("#botaoConverter")

document.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {

        botaoEnter.click();

    }
});

function converter() {
    let valorUsuario = document.getElementById("valor-usuario").value;
    let moedaOrigem = document.getElementById("moeda1").value;
    let moedaDestino = document.getElementById("moeda2").value;
    let paragrafoResultado = document.getElementById("resultado");

    let conversao = valorUsuario * valoresConversao[moedaOrigem][moedaDestino]


    if (moedaDestino == "dolar") {
        paragrafoResultado.textContent = conversao.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
    } else if (moedaDestino == "real") {
        paragrafoResultado.textContent = conversao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } else {
        paragrafoResultado.textContent = conversao.toLocaleString('pt-BR', { style: 'currency', currency: 'EUR' });
    }

}

function inverter() {
    let moeda1 = document.getElementById("moeda1").value;
    let moeda2 = document.getElementById("moeda2").value;

    document.getElementById("moeda1").value = moeda2;
    document.getElementById("moeda2").value = moeda1;
}
