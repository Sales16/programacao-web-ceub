let botaoConverter = document.getElementById("botaoConverter");
botaoConverter.addEventListener("click", converter);

let botaoInverter = document.getElementById("botaoInverter");
botaoInverter.addEventListener("click", inverter);

let botaoLimpar = document.getElementById("botaoLimpar");
botaoLimpar.addEventListener("click", limpar);

let botaoAceitaMensagem = document.getElementById("botao-aceita-mensagem");
botaoAceitaMensagem.addEventListener("click", aceitaMensagem);

document.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        converter();
    }
});

if (localStorage.getItem("aceitouCookie") == "1") {
    aceitaMensagem();
}

function buscaAPI(moedaOrigem = "USD", moedaDestino = "BRL") {
    let parameto = moedaOrigem + "-" + moedaDestino;
    let url = "https://economia.awesomeapi.com.br/json/last/" + parameto;
    return fetch(url).then(function (data) {
        if (data.status == 200) {
            console.log("Retorno código 200 API")
        }
        return data.json();
    }).then(function (response) {
        return response[moedaOrigem + moedaDestino];
    }).catch()
}

function salvarResltadoHistorico(conversao) {
    let historico = recuperarHistoricoDeConversao();

    historico.push(conversao);

    historico = JSON.stringify(historico)
    localStorage.setItem("historico", historico)
}

function recuperarHistoricoDeConversao() {
    let historico = localStorage.getItem("historico")

    if (!historico) {
        return [];
    }
    let historicoConvertido = JSON.parse(historico)
    return historicoConvertido;
}

function converter() {
    let valorUsuario = document.getElementById("valor-usuario").value;
    let moedaOrigem = document.getElementById("moeda1").value;
    let moedaDestino = document.getElementById("moeda2").value
    let paragrafoResultado = document.getElementById("resultado");
    let h2result = document.getElementById("h2result");

    if (valorUsuario < 0) {
        alert("Valor não pode ser negativo");
        return;
    }
    buscaAPI(moedaOrigem, moedaDestino).then(function (response) {
        let conversao = valorUsuario * response["ask"];

        if (moedaDestino == "USD") {
            paragrafoResultado.textContent = conversao.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
        } else if (moedaDestino == "BRL") {
            paragrafoResultado.textContent = conversao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        } else if (moedaDestino == "EUR") {
            paragrafoResultado.textContent = conversao.toLocaleString('pt-BR', { style: 'currency', currency: 'EUR' });
        } else if (moedaDestino == "GBP") {
            paragrafoResultado.textContent = conversao.toLocaleString('pt-BR', { style: 'currency', currency: 'GBP' })
        } else {
            paragrafoResultado.textContent = conversao.toLocaleString('pt-BR', { style: 'currency', currency: 'BTC' })
        }
        h2result.textContent = "Resultado:"
    
        let resultadoDaConversao = {
            valor: valorUsuario,
            moeda1: moedaOrigem,
            moeda2: moedaDestino,
            resultado: conversao
        }
        salvarResltadoHistorico(resultadoDaConversao);
    });
}

function inverter() {
    let moeda1 = document.getElementById("moeda1").value;
    let moeda2 = document.getElementById("moeda2").value;

    document.getElementById("moeda1").value = moeda2;
    document.getElementById("moeda2").value = moeda1;
}

function limpar() {
    let valorUsuario = document.getElementById("valor-usuario");
    let resultado = document.getElementById("resultado");
    let h2result = document.getElementById("h2result");

    valorUsuario.value = "";
    resultado.textContent = "";
    h2result.textContent = "";
}

function aceitaMensagem() {
    let divMensagemUsuario = document.getElementById("container-mensagem-usuario");
    divMensagemUsuario.classList.add("oculto");

    localStorage.setItem("aceitouCookie", "1");
}

const themeSwitch = document.getElementById('checkboxTheme');

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.documentElement.style.setProperty('--background-cor', 'white');
        document.documentElement.style.setProperty('--card-cor', '#e8e8e8');
        document.documentElement.style.setProperty('--text-cor', 'black');
    } else {
        document.documentElement.style.setProperty('--background-cor', '#171717');
        document.documentElement.style.setProperty('--card-cor', '#212121');
        document.documentElement.style.setProperty('--text-cor', '#ffffff');
    }
});
