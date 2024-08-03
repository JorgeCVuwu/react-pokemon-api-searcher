import { useState } from 'react'

import { searchPokemon } from '../services/pokemon.js'
import { searchPokemonFilter } from '../services/pokemon_filter.js'
import { searchPokemonSpecies } from '../services/pokemon_species.js'
import { POKEAPI_PREFIX } from '../constants/constants.js'
import { getSortedCommonElements, pushFilteringSpecialForms, removeDigits } from '../utils/utils.js'

export function useSearchPokemon () {
  const [foundedPokemon, setFoundedPokemon] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingStarted, setLoadingStarted] = useState(false)

  const queryPokemon = async (queryFields) => {
    setFoundedPokemon([])
    setLoading(true)
    setLoadingStarted(true)
    if (queryFields.name !== '') {
      const url = `${POKEAPI_PREFIX}pokemon/${queryFields.name}`
      try {
        const pokemonJson = await searchPokemon(url)
        setFoundedPokemon(prevState => [pokemonJson, ...prevState])
      } catch {
        console.error('Pokemon name search not founded')
      }
    } else {
      const validEntries = Object.entries(queryFields)
        .filter(([filter, value]) => filter !== 'include_pokemon_forms' && filter !== 'name' && value !== '')

      const PokemonFilterArrays = await Promise.all(validEntries
        .map(async ([filter, value]) => {
          try {
            const noDigitFilter = removeDigits(filter) //
            const url = `${POKEAPI_PREFIX}${noDigitFilter}/${value}`
            const pokemonFilter = await searchPokemonFilter(url, noDigitFilter)

            const pokemonPromises = pokemonFilter.pokemonList.map(async (pokemon) => {
              const urls = []
              let returnedUrls
              if (pokemon.url.includes('/pokemon-species/')) {
                const pokemonSpecies = await searchPokemonSpecies(pokemon.url)
                pokemonSpecies.varieties.forEach(form => urls.push(form.url))
              } else {
                urls.push(pokemon.url)
              }
              queryFields.include_pokemon_forms
                ? returnedUrls = urls
                : returnedUrls = pushFilteringSpecialForms(urls)
              return returnedUrls
            })

            return Promise.all(pokemonPromises).then(subArr => subArr.flat())
          } catch (err) {
            console.error(`Error processing Pokemon filters, ${err}`)
            return []
          }
        }))
      const sortedPokemonArray = getSortedCommonElements(PokemonFilterArrays)

      if (sortedPokemonArray) {
        for (let i = 0; i < sortedPokemonArray.length; i++) {
          const url = sortedPokemonArray[i]
          const pokemonJson = await searchPokemon(url)
          if (pokemonJson) {
            setFoundedPokemon(prevState => [...prevState, pokemonJson])
          }
        }
      }
    }
    setLoading(false)
  }

  return { foundedPokemon, loading, loadingStarted, queryPokemon }
}
