import { useEffect, useContext } from 'react'
import { PokemonPageContext } from '../context/pokemonPage'

export function useMoveset () {
  const { pokemonDefaultData, pokemonFormsData } = useContext(PokemonPageContext)

  // useEffect(() => {
  //   const defaultMoves = pokemonDefaultData.moves.map(move => )
  // }, [pokemonDefaultData, pokemonFormsData])
}
