import { createContext, useState } from 'react'

export const PokemonPageContext = createContext()

export function PokemonPageProvider ({ children }) {
  const [pokemonFormsData, setPokemonFormsData] = useState([])
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState(null)
  const [pokemonDefaultData, setPokemonDefaultData] = useState(null)

  return (
    <PokemonPageContext.Provider value={{
      pokemonFormsData,
      setPokemonFormsData,
      pokemonSpeciesData,
      setPokemonSpeciesData,
      pokemonDefaultData,
      setPokemonDefaultData
    }}>
        {children}
    </PokemonPageContext.Provider>
  )
}
