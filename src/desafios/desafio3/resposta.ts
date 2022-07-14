// O código abaixo tem alguns erros e não funciona como deveria. Você pode identificar quais são e corrigi-los em um arquivo TS?

/** 
    Em todos os casos abaixo de uso do getElementById(), o elemento é potencialmente nulo e ifs são necessários para garantir que seu código vai funcionar da melhor forma.
    No entanto, vão existir situações em que o desenvolvedor vai ter certeza de que o campo está lá e ele pode escrever o código da seguinte maneira:
        document.getElementById('limpar-saldo')!;
    A exclamação no fim é um sinal de que aquele campo não é nulo e que essa função realmente vai trazer algo. Assim, os ifs não são necessários.
    Como exemplo, vou seguir essa metodologia no campo 'botaoLimpar'.
*/

let botaoAtualizar = document.getElementById(
  "atualizar-saldo"
) as HTMLButtonElement;
let botaoLimpar = document.getElementById("limpar-saldo") as HTMLButtonElement;
let soma = document.getElementById("soma") as HTMLInputElement;
let campoSaldo = document.getElementById("campo-saldo") as HTMLTitleElement;
let campoErro = document.getElementById("msgError") as HTMLTitleElement;
let saldoAtual = 0;

campoSaldo.innerHTML = saldoAtual.toString();

function somarAoSaldo(saldo: number) {
  if (campoSaldo) {
    if (isNaN(saldo)) {
      campoErro.innerHTML = "Você só pode utilizar números nesse campo!!";
    } else {
      saldoAtual += saldo;
      campoErro.innerHTML = "";
      campoSaldo.innerHTML = saldoAtual.toString();
    }
  }
}

function limparSaldo() {
  saldoAtual = 0;
  campoSaldo.innerHTML = saldoAtual.toString();
}

function limparInput() {
  soma.value = "";
}

botaoAtualizar.addEventListener("click", function () {
  somarAoSaldo(Number(soma.value));
});

botaoLimpar.addEventListener("click", function () {
  limparSaldo();
  limparInput();
});

/**
    <h4>Valor a ser adicionado: <input id="soma"> </h4>
    <button id="atualizar-saldo">Atualizar saldo</button>
    <button id="limpar-saldo">Limpar seu saldo</button>
    <h1>"Seu saldo é: " <span id="campo-saldo"></span></h1>
*/
