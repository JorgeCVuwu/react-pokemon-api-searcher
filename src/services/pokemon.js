import { fetchData } from './fetch/fetch.js'

export async function searchPokemon (url) {
  const pokemonJson = await fetchData(url)

  return {
    name: pokemonJson.name,
    front_sprite: pokemonJson?.sprites?.front_default,
    dex_number: pokemonJson.id,
    cry: pokemonJson.cries.latest,
    types: pokemonJson.types.map(type => {
      const typeId = type.type.url.split('/').at(-2)
      return {
        id: typeId,
        url: type.type.url,
        order: type.slot
      }
    })
  }
}
