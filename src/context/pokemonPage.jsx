import { createContext, useState } from 'react'

export const PokemonPageContext = createContext()

export function PokemonPageProvider ({ children }) {
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState(null)
  const [pokemonDefaultData, setPokemonDefaultData] = useState(null)
  const [pokemonFormsData, setPokemonFormsData] = useState([])
  const [pokemonColors, setPokemonColors] = useState(null)
  const [charged, setCharged] = useState(false)

  return (
    <PokemonPageContext.Provider value={{
      pokemonSpeciesData,
      setPokemonSpeciesData,
      pokemonDefaultData,
      setPokemonDefaultData,
      pokemonFormsData,
      setPokemonFormsData,
      pokemonColors,
      setPokemonColors,
      charged,
      setCharged
    }}>
        {children}
    </PokemonPageContext.Provider>
  )
}
