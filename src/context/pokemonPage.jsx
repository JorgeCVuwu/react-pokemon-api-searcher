import { createContext, useState } from 'react'

export const PokemonPageContext = createContext()

export function PokemonPageProvider ({ children }) {
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState(null)
  const [pokemonDefaultData, setPokemonDefaultData] = useState(null)
  const [pokemonFormsData, setPokemonFormsData] = useState([])
  const [charged, setCharged] = useState(false)

  return (
    <PokemonPageContext.Provider value={{
      pokemonSpeciesData,
      setPokemonSpeciesData,
      pokemonDefaultData,
      setPokemonDefaultData,
      pokemonFormsData,
      setPokemonFormsData,
      charged,
      setCharged
    }}>
        {children}
    </PokemonPageContext.Provider>
  )
}
