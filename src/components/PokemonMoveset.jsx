import { useContext } from 'react'

import { useMoveset } from '../hooks/useMoveset.js'
import { PokemonPageContext } from '../context/pokemonPage.jsx'

import { capitalizeStr } from '../utils/utils.js'

export function PokemonMoveset () {
  const { pokemonLevelMoveset } = useMoveset()
  return pokemonLevelMoveset && (
    pokemonLevelMoveset.map((genMove, key) => (
      <table key={key}>
        <caption>{capitalizeStr(genMove.name, true, true)}</caption>
        <tbody>
          <tr>
            <th>Move</th>
            {genMove.display_info.display_one_row
              ? <th>{'Level'}</th>
              : genMove.display_info.columns.map((column, key) => (
                  <th key={key}>{capitalizeStr(column, true)}</th>
              ))}
          </tr>
          {genMove.moves.map((move, key) => (
            <tr key={key}>
              <td>{capitalizeStr(move.name)}</td>
              {genMove.display_info.display_one_row
                ? <td key={key}>{move.min_level || 'Evo'}</td>
                : genMove.display_info.columns.map((column, key) => (
                <td key={key}>{move.games[column] || (move.games[column] === 0 ? 'Evo' : '')}</td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </table>
    ))
  )
}
