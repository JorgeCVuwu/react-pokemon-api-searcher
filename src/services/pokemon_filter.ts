import { fetchData } from './fetch/fetch.ts'
import { POKEMON_LIST_KEY_IN_PROPERTY, POKEMON_KEY_IN_PROPERTY } from '../constants/constants.js'

export async function searchPokemonFilter (url, filterName) {
  const json = await fetchData(url)

  return {
    pokemonList: json[POKEMON_LIST_KEY_IN_PROPERTY[filterName]].map(pokemon => {
      const pokemonData = pokemon?.[POKEMON_KEY_IN_PROPERTY?.[filterName]] ?? pokemon
      return {
        url: pokemonData.url
      }
    })
  }
}
