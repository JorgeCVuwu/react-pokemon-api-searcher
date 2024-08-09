import { searchPokemonSpecies } from '../services/pokemon_species.js'
import { searchPokemon } from '../services/pokemon.js'
import { useState, useEffect } from 'react'
import { POKEAPI_PREFIX } from '../constants/constants.js'

export function useGetPokemonInfo (name) {
  const [pokemonFormsData, setPokemonFormsData] = useState([])
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState(null)

  useEffect(() => {
    const speciesUrl = `${POKEAPI_PREFIX}pokemon-species/${name}`
    searchPokemonSpecies(speciesUrl)
      .then(data => {
        setPokemonSpeciesData(data)
        return data
      })
      .then(jsonData => jsonData.varieties.forEach(pokemon => searchPokemon(pokemon.url)
        .then(pokemonJson => setPokemonFormsData(current => [...current, pokemonJson]))))
  }, [])

  return { pokemonSpeciesData, pokemonFormsData }
}
