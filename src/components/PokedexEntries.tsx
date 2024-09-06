import React, { useContext } from 'react'

import { PokemonPageContext } from '../context/pokemonPage.tsx'

import { GAMES_DATA } from '../constants/constants.ts'
import { capitalizeStr } from '../utils/utils.ts'

import '../styles/pokedex-entries.css'

export function PokedexEntries() {
  const { pokemonData, charged } = useContext(PokemonPageContext)
  return charged && (
    <table className='pokedex-entries-table'
      style={{ backgroundColor: pokemonData.colors.terciary, borderColor: pokemonData.colors.primary }}
    >
      <tbody>
        <tr className='pokedex-entries-row'>
          <th>Game</th>
          <th>Description</th>
        </tr>
        {
          pokemonData.species_data.flavor_text_entries.filter(info => info.language.name === 'en')
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
