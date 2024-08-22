import { fetchData } from './fetch/fetch.js'

export async function searchPokemonSpecies (url) {
  const pokemonJson = await fetchData(url)

  return {
    name: pokemonJson.name,
    varieties: pokemonJson.varieties.map(form => ({
      name: form.pokemon.name,
      url: form.pokemon.url,
      is_default: form.is_default
    })),
    generation: { name: pokemonJson.generation.name, url: pokemonJson.generation.url },
    evolution_chain: { url: pokemonJson.evolution_chain.url },
    is_legendary: pokemonJson.is_legendary,
    is_mythical: pokemonJson.is_mythical,
    flavor_text_entries: pokemonJson.flavor_text_entries.map(textEntries => ({
      flavor_text: textEntries.flavor_text,
      language: {
        name: textEntries.language.name,
        url: textEntries.language.url
      },
      version: {
        name: textEntries.version.name,
        url: textEntries.version.url
      }
    }))
  }
}
