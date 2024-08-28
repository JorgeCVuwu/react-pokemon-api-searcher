import { useContext } from 'react'
import { useNationalDex } from '../hooks/useNationalDex.js'

import { Link } from 'react-router-dom'
import { PokemonPageContext } from '../context/pokemonPage'

import { capitalizeStr } from '../utils/utils.js'

import '../styles/national-dex.css'

export function NationalDex () {
  const { prevPokemonInfo, nextPokemonInfo } = useNationalDex()
  const { pokemonDefaultData, pokemonSpeciesData, pokemonColors } = useContext(PokemonPageContext)

  return prevPokemonInfo && nextPokemonInfo && (
    <div className='national-dex-component-container'>
      <div className='national-dex-container' style={{ backgroundColor: pokemonColors.national_dex }}>
        <Link className='national-dex-link' to={`/pokemon/${prevPokemonInfo.name}`}>
          <div className='national-dex-attached-pokemon left'>
            {/* <p>#{prevPokemonInfo.id}</p> */}
            <i className='left-arrow'></i>
            <p>{capitalizeStr(prevPokemonInfo.name)}</p>
          </div>
        </Link>

        <div className='national-dex-current-container'>
          <div className='national-dex-sprite-container'>
            <img className='national-dex-sprite' src={pokemonDefaultData.sprites.front_sprite} alt={`Front sprite of ${pokemonDefaultData.name}`}></img>
          </div>
          <div className='national-dex-number'>{`#${pokemonSpeciesData.id}`}</div>
        </div>

        <Link className='national-dex-link' to={`/pokemon/${nextPokemonInfo.name}`}>
          <div className='national-dex-attached-pokemon right'>
            <p>{capitalizeStr(nextPokemonInfo.name)}</p>
            <i className='right-arrow'></i>
            {/* <p>#{nextPokemonInfo.id}</p> */}
          </div>
        </Link>
      </div>
    </div>
  )
}
