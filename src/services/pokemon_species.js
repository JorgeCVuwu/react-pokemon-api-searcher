import { fetchData } from './fetch/fetch.js'

export async function searchPokemonSpecies (url) {
  const pokemonJson = await fetchData(url)

  return {
    name: pokemonJson.name,
    varieties: pokemonJson.varieties.map(form => ({
      url: form.pokemon.url
    })),
    generation: { name: pokemonJson.generation.name, url: pokemonJson.generation.url },
    evolution_chain: { url: pokemonJson.evolution_chain.url },
    is_legendary: pokemonJson.is_legendary,
    is_mythical: pokemonJson.is_mythical
  }
}
