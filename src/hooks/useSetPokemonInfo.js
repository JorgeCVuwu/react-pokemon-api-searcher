import { searchPokemonSpecies } from '../services/pokemon_species.js'
import { searchPokemon } from '../services/pokemon.js'
import { useContext, useEffect } from 'react'
import { POKEAPI_PREFIX } from '../constants/constants.js'

import { PokemonPageContext } from '../context/pokemonPage.jsx'

export function useSetPokemonInfo (name) {
  const {
    setPokemonSpeciesData,
    setPokemonDefaultData,
    setPokemonFormsData,
    setCharged
  } = useContext(PokemonPageContext)

  useEffect(() => {
    let ignore = false

    setPokemonFormsData([])
    const speciesUrl = `${POKEAPI_PREFIX}pokemon-species/${name}`
    searchPokemonSpecies(speciesUrl)
      .then(data => {
        if (!ignore) {
          setPokemonSpeciesData(data)
        }
        return data
      })
      .then(jsonData => jsonData.varieties.forEach(pokemon => searchPokemon(pokemon.url)
        .then(pokemonJson => {
          if (!ignore) {
            pokemonJson.is_default
              ? setPokemonDefaultData(pokemonJson)
              : setPokemonFormsData(current => current.includes(pokemonJson)
                ? current
                : [...current, pokemonJson]
              )
          }
        })))
      .catch(err => console.error('Error loading page data: ', err))
      .finally(setCharged(true))

    return () => {
      ignore = true
    }
  }, [])
}
