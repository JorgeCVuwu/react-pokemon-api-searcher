import { createContext, useState, ReactNode } from 'react'

type inputProps = Record<string, { value: string, validated: boolean }>

interface PokemonSearchContextType {
  inputs: inputProps,
  setInputs: React.Dispatch<React.SetStateAction<inputProps>>
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
  const [inputs, setInputs] = useState<inputProps>({})

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
