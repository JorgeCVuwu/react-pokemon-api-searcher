import { useContext } from 'react'
import { useNationalDex } from '../hooks/useNationalDex.js'

import { Link } from 'react-router-dom'
import { PokemonPageContext } from '../context/pokemonPage'

import '../styles/national-dex.css'

export function NationalDex () {
  const { prevPokemonInfo, nextPokemonInfo } = useNationalDex()
  const { pokemonDefaultData, pokemonSpeciesData } = useContext(PokemonPageContext)

  return prevPokemonInfo && nextPokemonInfo && (
    <div>
      <p>{`#${pokemonSpeciesData.id}`}</p>
      <div className='national-dex-container'>
        <Link to={`/pokemon/${prevPokemonInfo.name}`}>
          <div className='national-dex-attached-pokemon left'>
            <p>#{prevPokemonInfo.id}</p>
            <p>{prevPokemonInfo.name}</p>
          </div>
        </Link>

        <div className='national-dex-current-container'>
          <div className='national-dex-sprite-container'>
            <img className='national-dex-sprite' src={pokemonDefaultData.sprites.front_sprite} alt={`Front sprite of ${pokemonDefaultData.name}`}></img>
          </div>
        </div>

        <Link to={`/pokemon/${nextPokemonInfo.name}`}>
          <div className='national-dex-attached-pokemon right'>
            <p>{nextPokemonInfo.name}</p>
            <p>#{nextPokemonInfo.id}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
