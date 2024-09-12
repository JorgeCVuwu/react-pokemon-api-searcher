import { useContext } from 'react'

import { useMoveset } from '../hooks/useMoveset.ts'
import { PokemonPageContext } from '../context/pokemonPage.tsx'

import { capitalizeStr } from '../utils/utils.ts'

import '../styles/moveset.css'

export function PokemonMoveset() {
  const { pokemonLevelMoveset, selectedGen, changeSelectedTable } = useMoveset()

  const { pokemonData, charged } = useContext(PokemonPageContext)

  const onPointerDown = (genName: string) => {
    changeSelectedTable({ genName })
  }

  return charged && pokemonData && pokemonLevelMoveset && (
    <div className='moveset-container'>
      <div className='moveset-buttons-container initial'>
        {pokemonLevelMoveset.map((genMove, key: number) => (
          <button
            key={key} style={{ backgroundColor: pokemonData.colors.terciary, borderColor: pokemonData.colors.primary }}
            onClick={() => onPointerDown(genMove.name)}
          >{capitalizeStr(genMove.name)}
          </button>
        ))}
      </div>
      <div className='moveset-tables-container'>
        {pokemonLevelMoveset.map((genMove, key: number) => (
          <table key={key} className='moveset-table' id={genMove.name} hidden={selectedGen !== genMove.name}>
            <caption>{capitalizeStr(genMove.name, true, true)}</caption>
            <tbody>
              <tr style={{ backgroundColor: pokemonData.colors.terciary }}>
                <th>Move</th>
                {genMove.display_info.display_one_row
                  ? <th>Level</th>
                  : genMove.display_info.columns.map((column: string, key: number) => (
                    <th key={key}>{capitalizeStr(column, true)}</th>
                  ))}
              </tr>
              {genMove.moves.map((move, key: number) => (
                <tr key={key} className={`${key % 2 !== 0 ? 'even-row' : ''}`}>
                  <td>{capitalizeStr(move.name)}</td>
                  {genMove.display_info.display_one_row
                    ? <td key={key} className='level-data-column'>{move.min_level || 'Evo'}</td>
                    : genMove.display_info.columns.map((column, key: number) => (
                      <td key={key} className='level-data-column'>{move.games[column] || (move.games[column] === 0 ? 'Evo' : '')}</td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  )
}
