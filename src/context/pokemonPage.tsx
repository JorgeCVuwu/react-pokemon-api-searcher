import { createContext, useState, ReactNode } from 'react'

// interface PokemonPageContextType {

// }

interface PokemonPageProviderProps {
  children: ReactNode
}

export const PokemonPageContext = createContext()


export function PokemonPageProvider({ children }: PokemonPageProviderProps) {
  // const [pokemonSpeciesData, setPokemonSpeciesData] = useState(null)
  // const [pokemonDefaultData, setPokemonDefaultData] = useState(null)
  // const [pokemonFormsData, setPokemonFormsData] = useState([])
  // const [pokemonColors, setPokemonColors] = useState(null)
  const [pokemonData, setPokemonData] = useState({})
  const [charged, setCharged] = useState(false)

  return (
    <PokemonPageContext.Provider value={{
      // pokemonSpeciesData,
      // setPokemonSpeciesData,
      // pokemonDefaultData,
      // setPokemonDefaultData,
      // pokemonFormsData,
      // setPokemonFormsData,
      pokemonData,
      setPokemonData,
      // pokemonColors,
      // setPokemonColors,
      charged,
      setCharged
    }}
    >
      {children}
    </PokemonPageContext.Provider>
  )
}
