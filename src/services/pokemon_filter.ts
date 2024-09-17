import { fetchData } from './fetch/fetch.ts'
import { pokemonPropertyTypes } from '../constants/constants.js'

import { pokeapiType } from './interfaces/pokeapi.ts'
import { pokemonFilterProps } from './interfaces/pokeapi/pokemon_filter.ts'
import { pokeapiAbilityProps } from './interfaces/pokeapi/ability.ts'
import { pokeapiTypeProps } from './interfaces/pokeapi/type.ts'
import { pokeapiMoveProps } from './interfaces/pokeapi/move.ts'
import { pokeapiGenerationProps } from './interfaces/pokeapi/generation.ts'

interface searchPokemonFilterProps {
  pokemonList: { url: string }[]
}

function searchAbilityFilter(json: pokeapiType): searchPokemonFilterProps {
  const abilityJson = json as pokeapiAbilityProps
  return {
    pokemonList: abilityJson.pokemon.map(pokemon => ({
      url: pokemon.pokemon.url
    }))
  }
}

function searchTypeFilter(json: pokeapiType): searchPokemonFilterProps {
  const typeJson = json as pokeapiTypeProps
  return {
    pokemonList: typeJson.pokemon.map(pokemon => ({
      url: pokemon.pokemon.url
    }))
  }
}
function searchMoveFilter(json: pokeapiType): searchPokemonFilterProps {
  const moveJson = json as pokeapiMoveProps
  return {
    pokemonList: moveJson.learned_by_pokemon.map(pokemon => ({
      url: pokemon.url
    }))
  }
}
function searchGenerationFilter(json: pokeapiType): searchPokemonFilterProps {
  const generationJson = json as pokeapiGenerationProps
  return {
    pokemonList: generationJson.pokemon_species.map(pokemon => ({
      url: pokemon.url
    }))
  }
}

export async function searchPokemonFilter(url: string, filterName: pokemonPropertyTypes): Promise<searchPokemonFilterProps | null> {
  const json: pokeapiType = await fetchData(url) as pokemonFilterProps
  if (json === null) return null

  const filterFunctions = {
    ability: searchAbilityFilter,
    type: searchTypeFilter,
    move: searchMoveFilter,
    generation: searchGenerationFilter
  }

  return filterFunctions[filterName](json)
}
