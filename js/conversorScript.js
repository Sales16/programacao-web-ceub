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

let botaoConverter = document.getElementById("botaoConverter");
botaoConverter.addEventListener("click", converter);

let botaoInverter = document.getElementById("botaoInverter");
botaoInverter.addEventListener("click", inverter);

let botaoLimpar = document.getElementById("botaoLimpar");
botaoLimpar.addEventListener("click", limpar);

let botaoAceitaMensagem = document.getElementById("botao-aceita-mensagem");
botaoAceitaMensagem.addEventListener("click", aceitaMensagem);

let botaoEnter = document.querySelector("#botaoConverter")

if (localStorage.getItem("aceitouCookie") == "1") {
    aceitaMensagem();
}

function buscaAPI() {
    let url = "https://economia.awesomeapi.com.br/json/last/USD-BRL"
    fetch(url).then(function(data){
        if(data.status == 200){
            console.log("retorno ok")
        }
        console.log(data);
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

document.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {

        botaoEnter.click();

    }
});

function converter() {
    buscaAPI();

    let valorUsuario = document.getElementById("valor-usuario").value;
    let moedaOrigem = document.getElementById("moeda1").value;
    let moedaDestino = document.getElementById("moeda2").value;
    let paragrafoResultado = document.getElementById("resultado");
    let h2result = document.getElementById("h2result");

    let conversao = valorUsuario * valoresConversao[moedaOrigem][moedaDestino]


    if (moedaDestino == "dolar") {
        paragrafoResultado.textContent = conversao.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
    } else if (moedaDestino == "real") {
        paragrafoResultado.textContent = conversao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } else {
        paragrafoResultado.textContent = conversao.toLocaleString('pt-BR', { style: 'currency', currency: 'EUR' });
    }
    h2result.textContent = "Resultado:"

    let resultadoDaConversao = {
        valor: valorUsuario,
        moeda1: moedaOrigem,
        moeda2: moedaDestino,
        resultado: conversao
    }
    salvarResltadoHistorico(resultadoDaConversao);
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
        // Aplicando cores escuras
        document.documentElement.style.setProperty('--background-cor', 'white');
        document.documentElement.style.setProperty('--card-cor', '#e8e8e8');
        document.documentElement.style.setProperty('--text-cor', 'black');
    } else {
        // Aplicando cores claras
        document.documentElement.style.setProperty('--background-cor', '#171717');
        document.documentElement.style.setProperty('--card-cor', '#212121');
        document.documentElement.style.setProperty('--text-cor', '#ffffff');
    }
});
