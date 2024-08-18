import { useContext, useEffect } from 'react'

import { PokemonPageContext } from '../context/pokemonPage.jsx'

import { searchEvolutionChain } from '../services/evolution_chain.js'

export function useEvolutions () {
  const { pokemonSpeciesData } = useContext(PokemonPageContext)

  useEffect(() => {
    if (pokemonSpeciesData) {
      const setEvolutions = async () => {
        const speciesChainUrl = pokemonSpeciesData.evolution_chain.url
        const speciesChain = await searchEvolutionChain(speciesChainUrl)
        console.dir(speciesChain)
      }

      setEvolutions()
    }
  }, [pokemonSpeciesData])
}
