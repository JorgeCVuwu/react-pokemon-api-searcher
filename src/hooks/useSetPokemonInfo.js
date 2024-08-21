import { searchPokemonSpecies } from '../services/pokemon_species.js'
import { searchPokemon } from '../services/pokemon.js'
import { useContext, useEffect } from 'react'
import { POKEAPI_PREFIX, POKEMON_TYPE_COLORS } from '../constants/constants.js'

import { PokemonPageContext } from '../context/pokemonPage.jsx'

export function useSetPokemonInfo (name) {
  const {
    pokemonDefaultData,
    setPokemonSpeciesData,
    setPokemonDefaultData,
    setPokemonFormsData,
    setPokemonColors,
    setCharged
  } = useContext(PokemonPageContext)

  useEffect(() => {
    if (pokemonDefaultData) {
      setPokemonColors(POKEMON_TYPE_COLORS[pokemonDefaultData.types[0].name])
    }
  }, [name, pokemonDefaultData])

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
  }, [name])
}
