import React, { useContext } from 'react'

import { PokemonPageContext } from '../context/pokemonPage.js'

import { GAMES_DATA } from '../constants/constants.js'
import { capitalizeStr } from '../utils/utils.js'

import '../styles/pokedex-entries.css'

export function PokedexEntries () {
  const { pokemonSpeciesData, pokemonColors } = useContext(PokemonPageContext)
  return (
    <table className='pokedex-entries-table' style={{ backgroundColor: pokemonColors.terciary, borderColor: pokemonColors.primary }}>
      <tbody>
        <tr className='pokedex-entries-row'>
          <th>Game</th>
          <th>Description</th>
        </tr>
        {
            pokemonSpeciesData.flavor_text_entries.filter(info => info.language.name === 'en')
              .map((info, key) => (
                <tr key={key} className='pokedex-entries-row'>
                  <td style={{ backgroundColor: GAMES_DATA[info.version.name].color, color: GAMES_DATA[info.version.name].fontColor ?? '#FFFFFF' }}>{capitalizeStr(info.version.name)}</td>
                  <td>{info.flavor_text.replace('', ' ')}</td>
                </tr>
              ))
            }
      </tbody>
    </table>
  )
}
