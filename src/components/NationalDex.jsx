import { useContext } from 'react'

import { Link } from 'react-router-dom'
import { PokemonPageContext } from '../context/pokemonPage'

import { POKEAPI_PREFIX } from '../constants/constants'

export function NationalDex () {
  const { pokemonDefaultData } = useContext(PokemonPageContext)

  return (
    <div>
        <img src={pokemonDefaultData.sprites.front_sprite}></img>
    </div>
  )
}
