import React from 'react'
import { useEvolutions } from '../hooks/useEvolutions.js'

import { capitalizeStr } from '../utils/utils.js'

import { POKEMON_TYPE_COLORS } from '../constants/constants.js'

import '../styles/evolution-tree.css'

const getNameDetails = (details, additionalString = '') => details ? (additionalString + details.name) : null

const pokemonEvolutionDetails = (evolutionDetails) => {
  const evolDetailsObj = {
    min_level: evolutionDetails.min_level ? 'Level ' + evolutionDetails.min_level : null,
    gender: evolutionDetails.gender === 1 ? '♀' : evolutionDetails.gender === 2 ? '♂' : null,
    held_item: getNameDetails(evolutionDetails.held_item, 'holding '),
    item: getNameDetails(evolutionDetails.item),
    known_move: getNameDetails(evolutionDetails.known_move, 'knowing '),
    known_move_type: getNameDetails(evolutionDetails.known_move_type),
    location: getNameDetails(evolutionDetails.location, 'on '),
    min_affection: evolutionDetails.min_affection,
    min_beauty: evolutionDetails.min_beauty ? evolutionDetails.min_beauty + ' beauty' : null,
    min_happiness: evolutionDetails.min_happiness ? evolutionDetails.min_happiness + ' happiness' : null,
    needs_overworld_rain: evolutionDetails.needs_overworld_rain ? 'overworld rain' : null,
    party_species: evolutionDetails.party_species,
    party_type: evolutionDetails.party_type,
    relative_physical_stats: evolutionDetails.relative_physical_stats,
    time_of_day: evolutionDetails.time_of_day ? 'on ' + evolutionDetails.time_of_day : '',
    trade_species: getNameDetails(evolutionDetails.trade_species, 'trading with '),
    turn_upside_down: evolutionDetails.turn_upside_down ? 'upside down the game console' : null
  }

  const evolutionDetailsString = Object.values(evolDetailsObj).filter(detail => detail).join(' ')
  const triggerConditions = {
    'level-up': evolDetailsObj.min_level ? '' : 'Level-up with',
    trade: 'Trade',
    'use-item': ''
  }

  const result = evolutionDetailsString
    ? triggerConditions[evolutionDetails.trigger.name] + ' ' + evolutionDetailsString
    : triggerConditions[evolutionDetails.trigger.name]

  return result
}

const RecursiveEvolutionsComponent = ({ evolutionChains }) => {
  const CurrentPokemon = ({ evolutionChains }) => {
    return (
      <div className='pokemon-evolution-pokemon' key={evolutionChains.form_data.id}>
        <p key={evolutionChains.form_data.id}>{capitalizeStr(evolutionChains.form_data.name)}</p>
        <div className='pokemon-evolution-image-outline'>
          <img className='pokemon-evolution-image'
          src={evolutionChains.form_data.sprites.front_default}
          alt={`Image of ${evolutionChains.form_data.name} in evolution tree`}
          />
        </div>
      </div>
    )
  }

  const EvolComponent = ({ evolutionChains }) => {
    const stage1Evolutions = []
    const stage2Evolutions = []

    const stage1EvoDetails = []
    const stage2EvoDetails = []

    evolutionChains.evolves_to.forEach(evol1 => {
      stage1Evolutions.push(<CurrentPokemon evolutionChains={evol1}/>)
      stage1EvoDetails.push(evol1.evolution_details)
      evol1.evolves_to.forEach(evol2 => {
        stage2Evolutions.push(<CurrentPokemon evolutionChains={evol2}/>)
        stage2EvoDetails.push(evol2.evolution_details)
      })
    })

    const StageDetails = ({ stageDetails }) => (
      stageDetails.length > 0 &&
        <div className='evolution-details-container'>
          {stageDetails.map((evoDetails, key) => (
            <div key={key}>
              <p>{pokemonEvolutionDetails(evoDetails)}</p>
              →
            </div>
          ))}
        </div>
    )

    const StageEvolutions = ({ stageEvolutions }) => (
      stageEvolutions.length > 0 &&
      <div className='evolution-column-container'>
        {stageEvolutions.map((evol1, key) => (
          <React.Fragment key={key}>
          { evol1 }
          </React.Fragment>
        ))}
      </div>
    )

    return (
      <>
        <div className='evolution-column-container'>
          <CurrentPokemon evolutionChains={evolutionChains}/>
        </div>
        <StageDetails stageDetails={stage1EvoDetails} />
        <StageEvolutions stageEvolutions={stage1Evolutions} />
        <StageDetails stageDetails={stage2EvoDetails} />
        <StageEvolutions stageEvolutions={stage2Evolutions} />
      </>
    )
  }

  return evolutionChains && (
      <EvolComponent evolutionChains={evolutionChains}/>
  )
}

export function PokemonEvolutionChain ({ className }) {
  const { evolutionChains } = useEvolutions()

  return evolutionChains && (
    <div className={`${className} pokemon-evolution-trees`}>
      {evolutionChains.map(evolTree => (
        <div key={evolTree.form_data.id} className={`${className} pokemon-evolution-tree`} style={{ backgroundColor: POKEMON_TYPE_COLORS[evolTree.form_data.types[0].name].secondary }}>
          <RecursiveEvolutionsComponent evolutionChains={evolTree} />
        </div>
      ))}
    </div>
  )
}
