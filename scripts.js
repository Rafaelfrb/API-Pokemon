const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, pokemon) => {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name)

    accumulator += `
            <li class="card ${types[0]}"> 
            <img class="card-image " alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
            <h2 class="card-title"> ${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(' | ')}  </p>
            </li>
            `
    return accumulator

}, '')


const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)




/*const url = "https://pokeapi.co/api/v2/pokemon";

    
async function getAllPokemon() {

    const response = await fetch(url);

    console.log('resposta: ', response);

    const data = await response.json()

    console.log('dados: ', data);

    console.log('resultado: ', data.results);
    
    const arrayPokemons = data.results;

    arrayPokemons.map(createPokemon);
    
    function createPokemon (pokes){

        const name = document.createElement("h2");

        name.innerText = arrayPokemons.name; //está criando 20 h2 com texto "undefined"

        console.log(name);

        /*const pokemon = document.createElement("h2");

        pokemon.innerText = pokemon.name;


        pokemonContainer.appendChild(div);
    }
}

getAllPokemon();*/

/*const url = "https://jsonplaceholder.typicode.com/posts";

const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");

const postPage = document.querySelector("#post");
const postContainer = document.querySelector("#post-container");
const commentsContainer = document.querySelector("#comments-container");

const commentForm = document.querySelector("#comment-form");
const emailInput = document.querySelector("#email");
const bodyInput = document.querySelector("#body");

// Load post
const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id");

// Get all posts
async function getAllPosts() {
  const response = await fetch(url);

  console.log(response);

  const data = await response.json();

  console.log(data);

  loadingElement.classList.add("hide");

  data.map((post) => {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const body = document.createElement("p");
    const link = document.createElement("a");

    title.innerText = post.title;
    body.innerText = post.body;
    link.innerText = "Ler";
    link.setAttribute("href", `/post.html?id=${post.id}`);

    div.appendChild(title);
    div.appendChild(body);
    div.appendChild(link);
    postsContainer.appendChild(div);
  });
}

// Get individual post
async function getPost(id) {
  const [responsePost, responseComments] = await Promise.all([
    fetch(`${url}/${id}`),
    fetch(`${url}/${id}/comments`),
  ]);

  const dataPost = await responsePost.json();

  const dataComments = await responseComments.json();

  loadingElement.classList.add("hide");
  postPage.classList.remove("hide");

  const title = document.createElement("h1");
  const body = document.createElement("p");

  title.innerText = dataPost.title;
  body.innerText = dataPost.body;

  postContainer.appendChild(title);
  postContainer.appendChild(body);

  dataComments.map((comment) => {
    createComment(comment);
  });
}

function createComment(comment) {
  const div = document.createElement("div");
  const email = document.createElement("h3");
  const commentBody = document.createElement("p");

  email.innerText = comment.email;
  commentBody.innerText = comment.body;

  div.appendChild(email);
  div.appendChild(commentBody);
  commentsContainer.appendChild(div);
}

// Insert a comment
async function postComment(comment) {
  const response = await fetch(url, {
    method: "POST",
    body: comment,
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await response.json();

  createComment(data);
}

if (!postId) {
  getAllPosts();
} else {
  getPost(postId);

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let comment = {
      email: emailInput.value,
      body: bodyInput.value,
    };

    comment = JSON.stringify(comment);

    postComment(comment);
  });
}*/