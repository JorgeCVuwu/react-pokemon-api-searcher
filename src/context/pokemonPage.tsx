import { createContext, useState, ReactNode } from 'react'

export const PokemonPageContext = createContext()

interface PokemonPageProviderProps {
  children: ReactNode
}

export function PokemonPageProvider({ children }: PokemonPageProviderProps) {
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState(null)
  const [pokemonDefaultData, setPokemonDefaultData] = useState(null)
  const [pokemonFormsData, setPokemonFormsData] = useState([])
  const [pokemonColors, setPokemonColors] = useState(null)
  const [charged, setCharged] = useState(false)

  const [pokemonData, setPokemonData] = useState({})

  return (
    <PokemonPageContext.Provider value={{
      pokemonSpeciesData,
      setPokemonSpeciesData,
      pokemonDefaultData,
      setPokemonDefaultData,
      pokemonFormsData,
      setPokemonFormsData,
      pokemonColors,
      setPokemonColors,
      charged,
      setCharged
    }}
    >
      {children}
    </PokemonPageContext.Provider>
  )
}
