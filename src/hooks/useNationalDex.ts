import { useEffect, useState, useContext } from 'react'
import { PokemonPageContext } from '../context/pokemonPage.js'
import { searchFilterResults } from '../services/filters.js'
import { POKEAPI_PREFIX } from '../constants/constants.js'

export function useNationalDex () {
  const [prevPokemonInfo, setPrevPokemonInfo] = useState(null)
  const [nextPokemonInfo, setNextPokemonInfo] = useState(null)
  const { pokemonSpeciesData } = useContext(PokemonPageContext)

  useEffect(() => {
    if (pokemonSpeciesData) {
      const currentId = pokemonSpeciesData.id
      const url = `${POKEAPI_PREFIX}pokemon-species?limit=100000&offset=0`
      searchFilterResults(url)
        .then(results => {
          const prevInfo = results.results.find(species => species.id === currentId - 1) ??
            results.results.find(species => species.id === results.results.length)
          const nextInfo = results.results.find(species => species.id === currentId + 1) ??
            results.results.find(species => species.id === 1)
          setPrevPokemonInfo(prevInfo)
          setNextPokemonInfo(nextInfo)
        })
    }
  }, [pokemonSpeciesData])

  return { prevPokemonInfo, nextPokemonInfo }
}
