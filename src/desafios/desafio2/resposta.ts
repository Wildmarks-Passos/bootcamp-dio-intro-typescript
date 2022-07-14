// Resposta desafio 02

enum Trabalho {
  Atriz,
  Padeiro,
}

type IPessoa = {
  nome: string;
  idade: number;
  profissao: Trabalho;
};

let pessoa1: IPessoa = {
  nome: "Maria",
  idade: 29,
  profissao: Trabalho.Atriz,
};

let pessoa2: IPessoa = {
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
