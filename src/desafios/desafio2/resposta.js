"use strict";
// Resposta desafio 02
var Trabalho;
(function (Trabalho) {
    Trabalho[Trabalho["Atriz"] = 0] = "Atriz";
    Trabalho[Trabalho["Padeiro"] = 1] = "Padeiro";
})(Trabalho || (Trabalho = {}));
let pessoa1 = {
    nome: "Maria",
    idade: 29,
    profissao: Trabalho.Atriz,
};
let pessoa2 = {
    nome: "Roberto",
    idade: 19,
    profissao: Trabalho.Padeiro,
};
let pessoa3 = {
    nome: "Laura",
    idade: 32,
    profissao: Trabalho.Atriz,
};
let pessoa4 = {
    nome: "Carlos",
    idade: 19,
    profissao: Trabalho.Padeiro,
};
