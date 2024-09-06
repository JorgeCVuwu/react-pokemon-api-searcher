import { searchPokemonSpecies } from '../services/pokemon_species.ts'
import { searchPokemon } from '../services/pokemon.ts'
import { useContext, useEffect } from 'react'

import { POKEAPI_PREFIX } from '../constants/constants.ts'

import { defineColor } from '../utils/utils.ts'

import { PokemonPageContext } from '../context/pokemonPage.tsx'

import { pokemonSpeciesProps } from '../services/interfaces/project/pokemon_species.ts'

export function useSetPokemonInfo(name: string) {
  const {
    pokemonData,
    setPokemonData,
    setCharged
  } = useContext(PokemonPageContext)

  // useEffect(() => {
  //   if (pokemonData) {
  //     const pokemonType = pokemonData.default_data.types[0].name
  //     const pokemonColors = {
  //       primary: defineColor({ type: pokemonType, priority: 'primary' }),
  //       secondary: defineColor({ type: pokemonType, priority: 'secondary' }),
  //       terciary: defineColor({ type: pokemonType, priority: 'terciary' }),
  //       national_dex: defineColor({ type: pokemonType, priority: 'national_dex' })
  //     }
  //     setPokemonData(current => ({ ...current, colors: pokemonColors }))
  //   }
  // }, [name, pokemonData])

  useEffect(() => {
    setCharged(false)
    let ignore = false

    const newSpeciesData: pokemonSpeciesProps = {
      id: 0,
      name: '',
      varieties: [],
      generation: {
        name: '',
        url: ''
      },
      evolution_chain: {
        url: ''
      },
      is_legendary: false,
      is_mythical: false,
      flavor_text_entries: []
    }

    const newPokemonData = { species_data: newSpeciesData, default_data: {}, forms_data: [], colors: {} }

    const searchAllPokemonInfo = async (speciesUrl: string) => {
      // setPokemonFormsData([])
      const species = await searchPokemonSpecies(speciesUrl)

      if (species === null) return null

      if (!ignore) {
        newPokemonData.species_data = species
      }

      for (const form of species.varieties) {
        const pokemonJson = await searchPokemon(form.url)
        if (!ignore && pokemonJson !== null) {
          if (pokemonJson.is_default) {
            newPokemonData.default_data = pokemonJson
            const pokemonType = pokemonJson.types[0].name
            if (pokemonType) {
              const pokemonColors = {
                primary: defineColor({ type: pokemonType, priority: 'primary' }),
                secondary: defineColor({ type: pokemonType, priority: 'secondary' }),
                terciary: defineColor({ type: pokemonType, priority: 'terciary' }),
                national_dex: defineColor({ type: pokemonType, priority: 'national_dex' })
              }
              newPokemonData.colors = pokemonColors

            }
          } else if (!newPokemonData.forms_data.includes(pokemonJson)) {
            newPokemonData.forms_data.push(pokemonJson)
          }
        }
      }

      if (!ignore) {
        setPokemonData(newPokemonData)
        setCharged(true)
      }
    }

    const speciesUrl = `${POKEAPI_PREFIX}pokemon-species/${name}`

    searchAllPokemonInfo(speciesUrl)

    return () => {
      ignore = true
    }
  }, [name])
}
