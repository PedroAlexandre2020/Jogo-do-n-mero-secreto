let listaNumerosSorteados =[];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

exibirMensagemInicial();

let numeroTentativas = 0;

function verificarChute() {
    numeroTentativas++;
    let chute = document.querySelector('input').value;
    let palavraTentativas = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', `O número secreto era o número ${numeroSecreto}. Você acertou com ${numeroTentativas} ${palavraTentativas}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('h1', 'Errou!')
        if( chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor. Quantidade de tentativas: ${numeroTentativas} ${palavraTentativas}.`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior. Quantidade de tentativas: ${numeroTentativas} ${palavraTentativas}.`);
        }
    }
    limparCampo();
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function gerarNumeroAleatorio () {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdElementos = listaNumerosSorteados.length;

    if(qtdElementos == numeroLimite) {
        listaNumerosSorteados = [];
    }
    if(listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    numeroTentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}