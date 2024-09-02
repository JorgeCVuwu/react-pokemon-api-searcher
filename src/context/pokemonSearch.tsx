import { createContext, useState } from 'react'

export const PokemonSearchContext = createContext()

export function PokemonSearchProvider ({ children }) {
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
