const listArea = document.querySelector('.pokemons');
const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

const fetchPokemons = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const pokemons = await Promise.all(data.results.map(mapEachPokemon));
    const newHTML = pokemons.map((pokemon) => convertToHTML(pokemon)).join('');
    listArea.innerHTML += newHTML;
    console.log(newHTML);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const mapEachPokemon = async (pokemon) => {
  try {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    const poke = {
      id: data.id,
      name: data.name,
      photo: data.sprites.front_default,
      types: data.types.map((typeSlot) => typeSlot.type.name),
      mainType: data.types[0].type.name,
    };
    return poke;
  } catch (error) {
    console.error('Error fetching pokemon data:', error);
    return {};
  }
};

const convertToHTML = (pokemon) => {
  console.log(pokemon);
  return `<li class="pokemon ${pokemon.mainType}">
            <span class="number">${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map(
                        (type) =>
                          `<li class="type ${pokemon.mainType}">${type}</li>`
                      )
                      .join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
    </li>`;
};

fetchPokemons();
