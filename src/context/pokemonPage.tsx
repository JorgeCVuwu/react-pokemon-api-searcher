import { createContext, useState, ReactNode } from 'react'

interface PokemonPageContextType {
  pokemonData: Record<string, unknown>,
  setPokemonData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>,
  charged: boolean,
  setCharged: React.Dispatch<React.SetStateAction<boolean>>,
  changingCharge: boolean,
  setChangingCharge: React.Dispatch<React.SetStateAction<boolean>>
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
  setChangingCharge: () => { }
}

export const PokemonPageContext = createContext<PokemonPageContextType>(defaultPokemonPageContextValue)


export function PokemonPageProvider({ children }: PokemonPageProviderProps) {
  const [pokemonData, setPokemonData] = useState({})
  const [charged, setCharged] = useState(false)
  const [changingCharge, setChangingCharge] = useState(false)

  return (
    <PokemonPageContext.Provider value={{
      pokemonData,
      setPokemonData,
      charged,
      setCharged,
      changingCharge,
      setChangingCharge
    }}
    >
      {children}
    </PokemonPageContext.Provider>
  )
}
