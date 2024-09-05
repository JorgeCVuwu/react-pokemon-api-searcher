import { searchPokemonSpecies } from '../services/pokemon_species.ts'
import { searchPokemon } from '../services/pokemon.ts'
import { useContext, useEffect } from 'react'

import { POKEAPI_PREFIX } from '../constants/constants.ts'

import { defineColor } from '../utils/utils.ts'

import { PokemonPageContext } from '../context/pokemonPage.tsx'

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
      const pokemonType = pokemonDefaultData.types[0].name
      const pokemonColors = {
        primary: defineColor({ type: pokemonType, priority: 'primary' }),
        secondary: defineColor({ type: pokemonType, priority: 'secondary' }),
        terciary: defineColor({ type: pokemonType, priority: 'terciary' }),
        national_dex: defineColor({ type: pokemonType, priority: 'national_dex' })
      }
      setPokemonColors(pokemonColors)
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
