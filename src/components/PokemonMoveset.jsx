import { useContext } from 'react'

import { useMoveset } from '../hooks/useMoveset.js'
import { PokemonPageContext } from '../context/pokemonPage.jsx'

import { capitalizeStr } from '../utils/utils.js'

import '../styles/moveset.css'

export function PokemonMoveset () {
  const { pokemonLevelMoveset, selectedGen, changeSelectedTable } = useMoveset()

  const { pokemonColors } = useContext(PokemonPageContext)

  const onPointerDown = (event, genName) => {
    changeSelectedTable({ genName })
  }

  return pokemonLevelMoveset && (
    <div className='moveset-tables-container'>
      <div>
        {pokemonLevelMoveset.map((genMove, key) => (
          <button key={key} onClick={event => onPointerDown(event, genMove.name)}>{capitalizeStr(genMove.name)}</button>
        ))}
      </div>
      <div>
        {pokemonLevelMoveset.map((genMove, key) => (
          <table key={key} className='moveset-table' id={genMove.name} hidden={selectedGen !== genMove.name}>
            <caption>{capitalizeStr(genMove.name, true, true)}</caption>
            <tbody>
              <tr style={{ backgroundColor: pokemonColors.terciary }}>
                <th>Move</th>
                {genMove.display_info.display_one_row
                  ? <th>{'Level'}</th>
                  : genMove.display_info.columns.map((column, key) => (
                      <th key={key}>{capitalizeStr(column, true)}</th>
                  ))}
              </tr>
              {genMove.moves.map((move, key) => (
                <tr key={key} className={`${key % 2 !== 0 ? 'even-row' : ''}`}>
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
        ))}
      </div>
    </div>
  )
}
