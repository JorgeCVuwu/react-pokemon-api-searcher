import { useContext } from 'react'

import { PokemonPageContext } from '../context/pokemonPage.jsx'

export function useGetPokemonInfo () {
  const {
    pokemonSpeciesData,
    pokemonDefaultData,
    pokemonFormsData,
    charged
  } = useContext(PokemonPageContext)

  return { pokemonSpeciesData, pokemonDefaultData, pokemonFormsData, charged }
}
