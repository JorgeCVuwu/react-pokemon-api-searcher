import { useEffect, useState, useContext } from 'react'
import { PokemonPageContext } from '../context/pokemonPage.tsx'
import { searchFilterResults } from '../services/filters.ts'
import { POKEAPI_PREFIX } from '../constants/constants.ts'

interface pokemonResumeData {
  id: number,
  name: string,
  url: string
}

export function useNationalDex() {
  const [prevPokemonInfo, setPrevPokemonInfo] = useState<pokemonResumeData>()
  const [nextPokemonInfo, setNextPokemonInfo] = useState<pokemonResumeData>()
  const { pokemonData } = useContext(PokemonPageContext)

  useEffect(() => {
    if (pokemonData) {
      const currentId = pokemonData.species_data.id
      const url = `${POKEAPI_PREFIX}pokemon-species?limit=100000&offset=0`
      searchFilterResults(url)
        .then(results => {
          if (results) {
            const prevInfo = results.results.find(species => species.id === currentId - 1) ??
              results.results.find(species => species.id === results.results.length)
            const nextInfo = results.results.find(species => species.id === currentId + 1) ??
              results.results.find(species => species.id === 1)
            setPrevPokemonInfo(prevInfo)
            setNextPokemonInfo(nextInfo)
          }
        })
    }
  }, [pokemonData])

  return { prevPokemonInfo, nextPokemonInfo }
}
