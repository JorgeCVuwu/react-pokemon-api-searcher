import { useContext } from 'react'

import { useMoveset } from '../hooks/useMoveset.js'
import { PokemonPageContext } from '../context/pokemonPage.jsx'

export function PokemonMoveset () {
  const { pokemonDefaultData, pokemonFormsData } = useContext(PokemonPageContext)
  return (
        <table>
            <tbody>
                <tr>
                    <th>Move</th>
                    <th>Level learned</th>
                </tr>
                {pokemonDefaultData.moves.filter(move => move.version_group_details
                  .some(version => version.level_learned_at > 0 && version.version_group.name === 'red-blue'))
                  .sort((move1, move2) => move1.version_group_details.find(version => version.version_group.name === 'red-blue').level_learned_at - move2.version_group_details.find(version => version.version_group.name === 'red-blue').level_learned_at)
                  .map((move, key) => (
                    <tr key={key}>
                        <td>{move.name}</td>
                        <td>{move.version_group_details.find(version => version.version_group.name === 'red-blue').level_learned_at}</td>
                    </tr>
                  ))}
            </tbody>
        </table>
  )
}
