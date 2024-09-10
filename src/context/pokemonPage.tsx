import { createContext, useState, useEffect, ReactNode } from 'react'

import { pokemonProps } from '../services/interfaces/project/pokemon.ts'
import { pokemonSpeciesProps } from '../services/interfaces/project/pokemon_species.ts'

import { searchPokemon } from '../services/pokemon.ts'
import { searchPokemonSpecies } from '../services/pokemon_species.ts'

import { POKEAPI_PREFIX, POKEMON_TYPES_TYPE } from '../constants/constants.ts'
import { defineColor } from '../utils/utils.ts'

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

interface PokemonDataProps {
  species_data: pokemonSpeciesProps,
  default_data: pokemonProps,
  forms_data: pokemonProps[],
  colors: { primary: string, secondary: string, terciary: string, national_dex: string }
}

interface PokemonPageContextType {
  pokemonData: PokemonDataProps | null,
  setPokemonData: SetState<PokemonDataProps | null>,
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
  pokemonData: null,
  setPokemonData: () => { },
  charged: false,
  setCharged: () => { },
  changingCharge: false,
  setChangingCharge: () => { },
  setName: () => { }
}

export const PokemonPageContext = createContext<PokemonPageContextType>(defaultPokemonPageContextValue)


export function PokemonPageProvider({ children }: PokemonPageProviderProps) {
  const [pokemonData, setPokemonData] = useState<PokemonDataProps | null>(null)
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

    const searchAllPokemonInfo = async (speciesUrl: string) => {
      // setPokemonFormsData([])
      const species = await searchPokemonSpecies(speciesUrl)

      if (species === null) return null

      const formsDataArr = []
      let defaultData = null
      let defaultColors = {
        primary: defineColor({ type: 'normal', priority: 'primary' }),
        secondary: defineColor({ type: 'normal', priority: 'secondary' }),
        terciary: defineColor({ type: 'normal', priority: 'terciary' }),
        national_dex: defineColor({ type: 'normal', priority: 'national_dex' })
      }

      for (const form of species.varieties) {
        const pokemonJson = await searchPokemon(form.url)
        if (!ignore && pokemonJson !== null) {
          if (pokemonJson.is_default) {
            defaultData = pokemonJson
            const pokemonType = pokemonJson.types[0].name as POKEMON_TYPES_TYPE
            if (pokemonType) {
              const pokemonColors = {
                primary: defineColor({ type: pokemonType, priority: 'primary' }),
                secondary: defineColor({ type: pokemonType, priority: 'secondary' }),
                terciary: defineColor({ type: pokemonType, priority: 'terciary' }),
                national_dex: defineColor({ type: pokemonType, priority: 'national_dex' })
              }
              defaultColors = pokemonColors
            }
          } else {
            formsDataArr.push(pokemonJson)
          }
        }
      }

      if (!defaultData) return null

      if (!ignore) {
        const newPokemonData = { species_data: species, default_data: defaultData, forms_data: formsDataArr, colors: defaultColors }
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
