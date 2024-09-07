import { createContext, useState, useEffect, ReactNode } from 'react'

import { defineColor } from '../utils/utils.ts'

import { pokemonProps } from '../services/interfaces/project/pokemon.ts'
import { pokemonSpeciesProps } from '../services/interfaces/project/pokemon_species.ts'

import { searchPokemon } from '../services/pokemon.ts'
import { searchPokemonSpecies } from '../services/pokemon_species.ts'

import { POKEAPI_PREFIX, POKEMON_TYPES_TYPE } from '../constants/constants.ts'

type SetState<T> = React.Dispatch<React.SetStateAction<T>>
interface PokemonPageContextType {
  pokemonData: Record<string, unknown>,
  setPokemonData: SetState<Record<string, unknown>>,
  charged: boolean,
  setCharged: SetState<boolean>,
  changingCharge: boolean,
  setChangingCharge: SetState<boolean>,
  setName: (name: string) => void
}

interface PokemonPageProviderProps {
  children: ReactNode
}

const defaultPokemonPageContextValue = {
  pokemonData: {},
  setPokemonData: () => { },
  charged: false,
  setCharged: () => { },
  changingCharge: false,
  setChangingCharge: () => { },
  setName: () => { }
}

export const PokemonPageContext = createContext<PokemonPageContextType>(defaultPokemonPageContextValue)


export function PokemonPageProvider({ children }: PokemonPageProviderProps) {
  const [pokemonData, setPokemonData] = useState({})
  const [pokemonName, setPokemonName] = useState<string>('')
  const [charged, setCharged] = useState<boolean>(false)
  const [changingCharge, setChangingCharge] = useState<boolean>(false)

  const setName = (name: string): void => {
    setPokemonName(name)
  }

  useEffect(() => {
    if (pokemonName === '') return
    if (charged) setChangingCharge(true)
    setCharged(false)
    let ignore = false

    const newPokemonData
      : {
        species_data: pokemonSpeciesProps | null, default_data: pokemonProps | null,
        forms_data: pokemonProps[], colors: { primary: string, secondary: string, terciary: string, national_dex: string } | null
      }
      = { species_data: null, default_data: null, forms_data: [], colors: null }

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
            const pokemonType = pokemonJson.types[0].name as POKEMON_TYPES_TYPE
            if (pokemonType) {
              const pokemonColors = {
                primary: defineColor({ type: pokemonType, priority: 'primary' }),
                secondary: defineColor({ type: pokemonType, priority: 'secondary' }),
                terciary: defineColor({ type: pokemonType, priority: 'terciary' }),
                national_dex: defineColor({ type: pokemonType, priority: 'national_dex' })
              }
              newPokemonData.colors = pokemonColors

            }
          } else {
            newPokemonData.forms_data.push(pokemonJson)
          }
        }
      }

      if (!ignore) {
        setPokemonData(newPokemonData)
        setCharged(true)
        setChangingCharge(false)
      }
    }

    const speciesUrl = `${POKEAPI_PREFIX}pokemon-species/${pokemonName}`

    searchAllPokemonInfo(speciesUrl)
    return () => {
      ignore = true
    }
  }, [pokemonName])



  return (
    <PokemonPageContext.Provider value={{
      pokemonData,
      setPokemonData,
      charged,
      setCharged,
      changingCharge,
      setChangingCharge,
      setName
    }}
    >
      {children}
    </PokemonPageContext.Provider>
  )
}
