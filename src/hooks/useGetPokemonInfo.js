import { useContext, useEffect } from 'react'
import { PokemonPageContext } from '../context/pokemonPage.jsx'

export function useGetPokemonInfo () {
  const {
    pokemonSpeciesData,
    pokemonDefaultData,
    PokemonFormsData,
    charged
  } = useContext(PokemonPageContext)

  return { pokemonSpeciesData, pokemonDefaultData, PokemonFormsData, charged }
}
