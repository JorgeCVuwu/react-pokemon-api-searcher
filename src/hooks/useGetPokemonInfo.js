import { searchPokemonSpecies } from '../services/pokemon_species.js'
import { searchPokemon } from '../services/pokemon.js'
import { useEffect, useContext } from 'react'
import { POKEAPI_PREFIX } from '../constants/constants.js'

import { PokemonPageContext } from '../context/pokemonPage.jsx'

export function useGetPokemonInfo (name) {
  const {
    pokemonFormsData, setPokemonFormsData,
    pokemonSpeciesData, setPokemonSpeciesData,
    pokemonDefaultData, setPokemonDefaultData
  } = useContext(PokemonPageContext)

  useEffect(() => {
    const speciesUrl = `${POKEAPI_PREFIX}pokemon-species/${name}`
    searchPokemonSpecies(speciesUrl)
      .then(data => {
        setPokemonSpeciesData(data)
        return data
      })
      .then(jsonData => jsonData.varieties.forEach(pokemon => searchPokemon(pokemon.url)
        .then(pokemonJson => {
          setPokemonFormsData(current => [...current, pokemonJson])

          if (pokemonJson.is_default) {
            setPokemonDefaultData(pokemonJson)
          }
        })))
  }, [])

  return { pokemonSpeciesData, pokemonFormsData, pokemonDefaultData }
}
