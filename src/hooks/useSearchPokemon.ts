import { useEffect, useState } from 'react'

import { searchPokemon } from '../services/pokemon.ts'
import { searchPokemonFilter } from '../services/pokemon_filter.ts'
import { searchPokemonSpecies } from '../services/pokemon_species.ts'
import { POKEAPI_PREFIX } from '../constants/constants.ts'
import { getSortedCommonElements, pushFilteringSpecialForms, removeDigits } from '../utils/utils.js'

import { pokemonProps } from '../services/interfaces/project/pokemon.ts'
import { queryFieldsProps } from '../interfaces/inputs.ts'


export function useSearchPokemon() {
  const [foundedPokemon, setFoundedPokemon] = useState<pokemonProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingStarted, setLoadingStarted] = useState<boolean>(false)
  const [input, setInput] = useState<queryFieldsProps | null>(null)

  const changeInputs = (currentInput: queryFieldsProps) => {
    setInput((previous) => {
      if (!previous) return currentInput

      return JSON.stringify(previous) === JSON.stringify(currentInput) // both object attr order always will be equal
        ? previous
        : currentInput
    })
  }

  useEffect(() => {
    if (input) { queryPokemon(input) }
  }, [input])

  const queryPokemon = async (queryFields: queryFieldsProps) => {
    setFoundedPokemon([])
    setLoading(true)
    setLoadingStarted(true)
    if (queryFields.name !== '') {
      const url = `${POKEAPI_PREFIX}pokemon/${queryFields.name}`
      try {
        const pokemonJson = await searchPokemon(url)
        if (pokemonJson) {
          setFoundedPokemon(prevState => [pokemonJson, ...prevState])
        }
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

            if (!pokemonFilter) return null
            const pokemonPromises = pokemonFilter.pokemonList.map(async (pokemon) => {
              const urls = []
              let returnedUrls
              if (pokemon.url.includes('/pokemon-species/')) {
                const pokemonSpecies = await searchPokemonSpecies(pokemon.url)
                if (pokemonSpecies) {
                  pokemonSpecies.varieties.forEach(form => urls.push(form.url))
                }
              } else {
                urls.push(pokemon.url)
              }
              if (queryFields.include_pokemon_forms) {
                returnedUrls = urls
              } else {
                returnedUrls = pushFilteringSpecialForms(urls)
              }
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
        const pokemonUrlsPromises = sortedPokemonArray.map(async url => {
          const pokemonJson = await searchPokemon(url)
          return pokemonJson || null
        })

        const results = await Promise.all(pokemonUrlsPromises)

        setFoundedPokemon(prevState => [...prevState, ...results.filter(result => result !== null)])
      }
    }

    setLoading(false)
  }

  return { foundedPokemon, loading, loadingStarted, input, queryPokemon, changeInputs }
}
