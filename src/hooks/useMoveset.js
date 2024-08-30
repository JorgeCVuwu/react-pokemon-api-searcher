import { useState, useEffect, useContext, useRef } from 'react'
import { PokemonPageContext } from '../context/pokemonPage'

import { GAMES_DATA } from '../constants/constants.js'

const splitFirstHalf = (str) => {
  if (!str.includes('-')) return str

  const split = str.split('-')
  const middleIndex = Math.floor(split.length / 2)

  return split.slice(0, middleIndex).join('-')
}

export function useMoveset () {
  const [pokemonLevelMoveset, setPokemonLevelMoveset] = useState(null)
  const [selectedGen, setSelectedGen] = useState(null)
  const tablesRef = useRef({})

  const { pokemonDefaultData, pokemonFormsData } = useContext(PokemonPageContext)

  const changeSelectedTable = ({ genName }) => {
    tablesRef.current[selectedGen].hidden = true
    tablesRef.current[genName].hidden = false
    setSelectedGen(genName)
  }

  useEffect(() => {
    if (pokemonLevelMoveset) {
      const initialTableGen = pokemonLevelMoveset[0].name
      setSelectedGen(initialTableGen)
      tablesRef.current[initialTableGen].hidden = false
    }
  }, [pokemonLevelMoveset])

  useEffect(() => {
    const learnedByLevelMoves = []

    pokemonDefaultData.moves.forEach((move) => {
      const genMoveOcurrences = {} // {red-blue: 2, yellow: 1}

      move.version_group_details.forEach(detail => {
        const gamesName = detail.version_group.name
        const learnMethod = detail.move_learn_method.name

        if (learnMethod !== 'level-up') return

        const firstGenGame = splitFirstHalf(gamesName)
        const gameObject = GAMES_DATA[firstGenGame]
        if (!gameObject) return

        const currentGen = gameObject.alternative_gen ? gamesName : gameObject.generation
        const genObj = learnedByLevelMoves.find(gen => gen.name === currentGen)
        const moveGameInfo = { [gamesName]: detail.level_learned_at }
        const genMoveInfo = {
          name: move.name,
          games: moveGameInfo,
          min_level: detail.level_learned_at,
          max_level: detail.level_learned_at
        }

        if (genObj) {
          if (!genObj.display_info.columns.includes(gamesName)) genObj.display_info.columns.push(gamesName)
          const moveObj = genObj.moves.find(genMove => genMove.name === move.name)

          if (moveObj) {
            const setLevelLearned = (move) => {
              move.games[gamesName] = detail.level_learned_at
              move.min_level = Math.min(move.min_level, detail.level_learned_at)
              move.max_level = Math.max(move.max_level, detail.level_learned_at)
              if (move.min_level !== move.max_level) {
                genObj.display_info.display_one_row = false
              }
            }

            if (moveObj.games[gamesName] || moveObj.games[gamesName] === 0) {
              const moveIndex = genMoveOcurrences[gamesName]
              const newMoveObj = genObj.moves.filter(genMove => genMove.name === move.name)[moveIndex]
              // controlling learning moves multiple times for level method
              newMoveObj
                ? setLevelLearned(newMoveObj)
                : genObj.moves.push({
                  name: move.name,
                  games: { [gamesName]: detail.level_learned_at },
                  min_level: detail.level_learned_at,
                  max_level: detail.level_learned_at
                })
            } else {
              setLevelLearned(moveObj)
            }
          } else {
            genObj.moves.push(genMoveInfo)
          }
        } else {
          learnedByLevelMoves.push({
            name: currentGen,
            moves: [genMoveInfo],
            display_info: { columns: [gamesName], display_one_row: true }
          })
        }

        genMoveOcurrences[gamesName] ??= 0
        genMoveOcurrences[gamesName]++
      })
    })

    const sortedLearnedByLevel = learnedByLevelMoves.map(gen => {
      return {
        ...gen,
        moves: structuredClone(gen.moves)
          .sort((move1, move2) => {
            const firstCondition = move1.min_level - move2.min_level
            return firstCondition !== 0
              ? firstCondition
              : move1.max_level - move2.max_level
          }
          )
      }
    })
    setPokemonLevelMoveset(sortedLearnedByLevel)
  }, [pokemonDefaultData, pokemonFormsData])

  return { pokemonLevelMoveset, tablesRef, changeSelectedTable }
}

// Object structure:
// [{name:'gen-1', display_info: { columns: ['red-blue', 'yellow'], display_one_row: true }, moves: [{name: 'thundershock', games: {'red-blue': 1, 'yellow': 7}, ... ]}]}]
