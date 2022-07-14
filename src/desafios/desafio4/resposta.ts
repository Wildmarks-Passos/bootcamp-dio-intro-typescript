// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que:
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction

let apiKey = "4f2c1abf35cbaa05dc69b4c9cebe0cc3";
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId = "7101979";

let loginButton = document.getElementById("login-button") as HTMLButtonElement;
let searchButton = document.getElementById(
  "search-button"
) as HTMLButtonElement;
let searchContainer = document.getElementById(
  "search-container"
) as HTMLDivElement;

loginButton?.addEventListener("click", async () => {
  await criarRequestToken();
  await logar();
  await criarSessao();
});

interface IListaDeFilmes {
  page: number;
  results: [
    {
      original_title: string;
    }
  ];
  total_pages: number;
  total_results: number;
}

searchButton?.addEventListener("click", async () => {
  let lista = document.getElementById("lista");
  if (lista) {
    lista.outerHTML = "";
  }
  let query = document.getElementById("search") as HTMLInputElement;
  let listaDeFilmes: IListaDeFilmes = await procurarFilme(query.value);
  let ul = document.createElement("ul");
  ul.id = "lista";
  for (const item of listaDeFilmes.results) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(item.original_title));
    ul.appendChild(li);
  }
  console.log(listaDeFilmes);
  searchContainer.appendChild(ul);
});

function preencherSenha() {
  let input = document.getElementById("senha") as HTMLInputElement;
  password = input.value;
  validateLoginButton();
}

function preencherLogin() {
  let input = document.getElementById("login") as HTMLInputElement;
  username = input.value;
  validateLoginButton();
}

function preencherApi() {
  let input = document.getElementById("api-key") as HTMLInputElement;
  apiKey = input.value;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

async function procurarFilme(query: string): Promise<IListaDeFilmes> {
  query = encodeURI(query);
  console.log(query);
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data: IListaDeFilmes) => {
      let result: IListaDeFilmes;
      result = data;
      return result;
    });
}

async function adicionarFilme(filmeId: number) {
  await fetch(
    `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`
  ).then((res) => {
    console.log(res);
  });
}

async function criarRequestToken() {
  await fetch(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      requestToken = data.request_token;
    });
}

async function logar() {
  await fetch(
    `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
        request_token: `${requestToken}`,
      }),
    }
  );
}

async function criarSessao() {
  await fetch(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      sessionId = data.session_id;
    });
}

async function criarLista(nomeDaLista: string, descricao: string) {
  await fetch(
    `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nomeDaLista,
        description: descricao,
        language: "pt-br",
      }),
    }
  ).then((res) => {
    console.log(res);
  });
}

async function adicionarFilmeNaLista(filmeId: number, listaId: string) {
  await fetch(
    `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media_id: filmeId,
      }),
    }
  ).then((res) => {
    console.log(res);
  });
}

async function pegarLista() {
  await fetch(
    `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`
  ).then((res) => {
    console.log(res);
  });
}

{
  /* <div style="display: flex;">
  <div style="display: flex; width: 300px; height: 100px; justify-content: space-between; flex-direction: column;">
      <input id="login" placeholder="Login" onchange="preencherLogin(event)">
      <input id="senha" placeholder="Senha" type="password" onchange="preencherSenha(event)">
      <input id="api-key" placeholder="Api Key" onchange="preencherApi()">
      <button id="login-button" disabled>Login</button>
  </div>
  <div id="search-container" style="margin-left: 20px">
      <input id="search" placeholder="Escreva...">
      <button id="search-button">Pesquisar Filme</button>
  </div>
</div>*/
}
