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
    setCharged(false)
    let ignore = false

    const searchAllPokemonInfo = async (speciesUrl) => {
      setPokemonFormsData([])
      const species = await searchPokemonSpecies(speciesUrl)
      if (!ignore) {
        await setPokemonSpeciesData(species)
      }

      for (const form of species.varieties) {
        const pokemonJson = await searchPokemon(form.url)
        if (!ignore) {
          pokemonJson.is_default
            ? setPokemonDefaultData(pokemonJson)
            : setPokemonFormsData(current => current.includes(pokemonJson)
              ? current
              : [...current, pokemonJson]
            )
        }
      }

      setCharged(true)
    }

    const speciesUrl = `${POKEAPI_PREFIX}pokemon-species/${name}`

    searchAllPokemonInfo(speciesUrl)

    return () => {
      ignore = true
    }
  }, [])
}
