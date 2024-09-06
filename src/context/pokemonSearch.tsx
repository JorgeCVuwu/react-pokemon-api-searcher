import { createContext, useState, ReactNode } from 'react'


interface PokemonSearchContextType {
  inputs: Record<string, unknown>,
  setInputs: React.Dispatch<React.SetStateAction<Record<string, unknown>>>
}

interface PokemonSearchProviderProps {
  children: ReactNode
}

const defaultPokemonSearchContextValue = {
  inputs: {},
  setInputs: () => { }
}

export const PokemonSearchContext = createContext<PokemonSearchContextType>(defaultPokemonSearchContextValue)

export function PokemonSearchProvider({ children }: PokemonSearchProviderProps) {
  const [inputs, setInputs] = useState<Record<string, unknown>>({})

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
