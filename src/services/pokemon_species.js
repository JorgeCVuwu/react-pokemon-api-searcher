import { fetchData } from './fetch/fetch.js'

export async function searchPokemonSpecies (url) {
  const pokemonJson = await fetchData(url)

  return {
    name: pokemonJson.name,
    varieties: pokemonJson.varieties.map(form => ({
      url: form.pokemon.url
    }))
  }
}
