const pokemonImage = document.querySelector('.pokemon__image');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonName = document.querySelector('.pokemon__name');
const pokemonForm = document.querySelector('.form');
const pokemonInput = document.querySelector('.input__search');
const pokemonPrev = document.querySelector('.btn-prev');
const pokemonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (apiResponse.status == 200) {
    const data = await apiResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  loading();

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonNumber.innerHTML = data.id;
    pokemonName.innerHTML = data.name;
    pokemonInput.value = '';
    searchPokemon = data.id;
  } else {
    notFound();
  }
}

pokemonForm.addEventListener('submit', (event) => {
  event.preventDefault(); //bloqueia o comportamento padrão do formulário

  renderPokemon(pokemonInput.value.toLowerCase());
})

pokemonPrev.addEventListener('click', ()=>{
  if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

pokemonNext.addEventListener('click', ()=>{
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

const loading = () =>{
  pokemonImage.style.display = 'block';
  pokemonNumber.innerHTML = '';
  pokemonName.innerHTML = 'Loading...';
  pokemonInput.value = '';
}

const notFound = () =>{
  pokemonImage.style.display = 'none';
  pokemonNumber.innerHTML = '?';
  pokemonName.innerHTML = 'Not found :c';
  pokemonInput.value = '';
}

renderPokemon(searchPokemon);