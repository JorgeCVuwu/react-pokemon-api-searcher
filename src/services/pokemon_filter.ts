import { fetchData } from './fetch/fetch.ts'
import { POKEMON_LIST_KEY_IN_PROPERTY, POKEMON_KEY_IN_PROPERTY, pokemonPropertyTypes, pokemonFilterProperties } from '../constants/constants.js'

import { pokeapiType } from './interfaces/pokeapi.ts'
import { pokemonFilterProps } from './interfaces/pokeapi/pokemon_filter.ts'

export async function searchPokemonFilter(url: string, filterName: pokemonPropertyTypes): Promise<{ url: string }[] | null> {
  const json: pokeapiType = await fetchData(url) as pokemonFilterProps

  if (json === null) return null

  const propertyName: pokemonFilterProperties = POKEMON_LIST_KEY_IN_PROPERTY[filterName]
  const jsonProperty = json[propertyName] ?? null
  const keyInProperty: string | null = POKEMON_KEY_IN_PROPERTY?.[filterName] ?? null

  if (jsonProperty === null) return null

  return {
    pokemonList: jsonProperty.map(pokemon => {
      const pokemonData = keyInProperty !== null ? pokemon?.[keyInProperty] ?? pokemon : null
      return {
        url: pokemonData.url
      }
    })
  }
}
