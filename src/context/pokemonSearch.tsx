import { createContext, useState, ReactNode } from 'react'

export const PokemonSearchContext = createContext()

interface PokemonSearchProviderProps {
  children: ReactNode
}

export function PokemonSearchProvider({ children }: PokemonSearchProviderProps) {
  const [inputs, setInputs] = useState({})

  return (
    <PokemonSearchContext.Provider value={{
      inputs,
      setInputs
    }}
    >
      {children}
    </PokemonSearchContext.Provider>
  )
}
