import { createContext, useState, ReactNode } from 'react'


interface PokemonSearchContextType {
  inputs: Record<string, unknown>
  setInputs: React.Dispatch<React.SetStateAction<Record<string, unknown>>>
}

export const PokemonSearchContext = createContext<PokemonSearchContextType | undefined>(undefined)

interface PokemonSearchProviderProps {
  children: ReactNode
}

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
