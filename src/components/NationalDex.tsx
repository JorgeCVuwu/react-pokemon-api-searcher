import { useContext } from 'react'
import { useNationalDex } from '../hooks/useNationalDex.ts'

import { Link } from 'react-router-dom'
import { PokemonPageContext } from '../context/pokemonPage.tsx'

import { capitalizeStr } from '../utils/utils.ts'

import '../styles/national-dex.css'

export function NationalDex() {
  const { prevPokemonInfo, nextPokemonInfo } = useNationalDex()
  const { pokemonData } = useContext(PokemonPageContext)

  return prevPokemonInfo && nextPokemonInfo && pokemonData && (
    <div className='national-dex-component-container'>
      <div className='national-dex-container' style={{ backgroundColor: pokemonData.colors.national_dex }}>
        <Link className='national-dex-link' to={`/pokemon/${prevPokemonInfo.name}`}>
          <div className='national-dex-attached-pokemon left'>
            {/* <p>#{prevPokemonInfo.id}</p> */}
            <i className='left-arrow' />
            <p>{capitalizeStr(prevPokemonInfo.name)}</p>
          </div>
        </Link>

        <div className='national-dex-current-container'>
          <div className='national-dex-sprite-container'>
            <img className='national-dex-sprite' src={pokemonData.default_data.sprites.front_sprite} alt={`Front sprite of ${pokemonData.default_data.name}`} />
          </div>
          <div className='national-dex-number'>{`#${pokemonData.species_data.id}`}</div>
        </div>

        <Link className='national-dex-link' to={`/pokemon/${nextPokemonInfo.name}`}>
          <div className='national-dex-attached-pokemon right'>
            <p>{capitalizeStr(nextPokemonInfo.name)}</p>
            <i className='right-arrow' />
            {/* <p>#{nextPokemonInfo.id}</p> */}
          </div>
        </Link>
      </div>
    </div>
  )
}
