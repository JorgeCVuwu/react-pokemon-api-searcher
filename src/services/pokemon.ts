import { fetchData } from './fetch/fetch.ts'
import { pokemonJsonDataProps, pokemonDataProps } from '../interfaces/pokemon.ts'

export async function searchPokemon(url: string): Promise<pokemonDataProps | null> {
  const pokemonJson: pokemonJsonDataProps | null = await fetchData(url)

  if (pokemonJson === null) return null

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
      const getId = type.type.url.split('/').at(-2)
      return {
        id: getId !== undefined ? +getId : undefined,
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
    stats: pokemonJson.stats.map(stat => ({
      name: stat.stat.name,
      base_stat: stat.base_stat,
      effort: stat.effort,
      url: stat.stat.url
    })),
    height: pokemonJson.height,
    weight: pokemonJson.weight,
    moves: pokemonJson.moves.map(move => ({
      name: move.move.name,
      url: move.move.url,
      version_group_details: move.version_group_details.map(detail => ({
        level_learned_at: detail.level_learned_at,
        move_learn_method: { name: detail.move_learn_method.name, url: detail.move_learn_method.url },
        version_group: { name: detail.version_group.name, url: detail.version_group.url }
      }))
    }))
  }
}
