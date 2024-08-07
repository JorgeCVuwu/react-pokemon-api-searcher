import { createContext, useState } from 'react'

export const PokemonSearchContext = createContext()

export function PokemonSearchProvider ({ children }) {
  const [inputs, setInputs] = useState({})
  const [validated, setValidated] = useState(false)

  return (
    <PokemonSearchContext.Provider value={{
      validated,
      setValidated,
      inputs,
      setInputs
    }}>
        {children}
    </PokemonSearchContext.Provider>
  )
}
