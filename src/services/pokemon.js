import { fetchData } from './fetch/fetch.js'

export async function searchPokemon (url) {
  const pokemonJson = await fetchData(url)

  return {
    id: pokemonJson.id,
    name: pokemonJson.name,
    front_sprite: pokemonJson?.sprites?.front_default, // cambiar a futuro
    sprites: {
      front_sprite: pokemonJson?.sprites?.front_default,
      front_default: pokemonJson?.sprites.other['official-artwork'].front_default,
      front_default_shiny: pokemonJson?.sprites.other['official-artwork'].front_shiny
    },
    dex_number: pokemonJson.id,
    cry: pokemonJson.cries.latest,
    types: pokemonJson.types.map(type => {
      const typeId = type.type.url.split('/').at(-2)
      return {
        id: typeId,
        name: type.type.name,
        url: type.type.url,
        order: type.slot
      }
    }),
    is_default: pokemonJson.is_default,
    species: { name: pokemonJson.species.name, url: pokemonJson.species.url },
    abilities: pokemonJson.abilities.map(ability => ({
      name: ability.ability.name,
      url: ability.ability.url,
      is_hidden: ability.is_hidden
    })),
    base_stats: pokemonJson.stats.map(stat => ({
      name: stat.stat.name,
      base_stat: stat.base_stat,
      effort: stat.effort,
      url: stat.stat.url
    })),
    height: pokemonJson.height,
    weight: pokemonJson.weight
  }
}
