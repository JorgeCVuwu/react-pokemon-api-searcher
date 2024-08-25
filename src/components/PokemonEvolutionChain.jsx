import React, { useContext } from 'react'

import { useEvolutions } from '../hooks/useEvolutions.js'

import { PokemonPageContext } from '../context/pokemonPage.jsx'

import { Link } from 'react-router-dom'

import { capitalizeStr, defineColor } from '../utils/utils.js'

import '../styles/evolution-tree.css'

const getNameDetails = (details, additionalString = '', additionalAfterString = '') => details
  ? (additionalString + capitalizeStr(details.name) + additionalAfterString)
  : null

const relativePhysicalStats = {
  0: 'with equal attack and defense stat',
  1: 'with more attack than defense',
  [-1]: 'with more defense than attack'
}

const genders = {
  1: '♀',
  2: '♂'
}

const pokemonEvolutionDetails = (evolutionDetails) => {
  const evolDetailsObj = {
    min_level: evolutionDetails.min_level
      ? 'Level ' + evolutionDetails.min_level
      : null,
    gender: genders[evolutionDetails.gender] || null,
    held_item: getNameDetails(evolutionDetails.held_item, 'holding '),
    item: getNameDetails(evolutionDetails.item),
    known_move: getNameDetails(evolutionDetails.known_move, 'knowing '),
    known_move_type: getNameDetails(evolutionDetails.known_move_type, 'knowing a ', ' type move'),
    location: getNameDetails(evolutionDetails.location, 'on '),
    min_affection: evolutionDetails.min_affection
      ? 'with ' + evolutionDetails.min_affection + ' affection'
      : null,
    min_beauty: evolutionDetails.min_beauty
      ? evolutionDetails.min_beauty + ' beauty'
      : null,
    min_happiness: evolutionDetails.min_happiness
      ? 'with ' + evolutionDetails.min_happiness + ' happiness'
      : null,
    needs_overworld_rain: evolutionDetails.needs_overworld_rain
      ? 'overworld rain'
      : null,
    party_species: evolutionDetails.party_species,
    party_type: evolutionDetails.party_type,
    relative_physical_stats: relativePhysicalStats[evolutionDetails.relative_physical_stats] || null,
    time_of_day: evolutionDetails.time_of_day
      ? 'on ' + evolutionDetails.time_of_day
      : '',
    trade_species: getNameDetails(evolutionDetails.trade_species, 'trading for '),
    turn_upside_down: evolutionDetails.turn_upside_down
      ? 'upsiding down the game console'
      : null
  }

  const evolutionDetailsString = Object.values(evolDetailsObj)
  const triggerConditions = {
    'level-up': evolDetailsObj.min_level ? '' : 'Level-up',
    trade: 'Trade',
    'use-item': ''
  }

  const arrResult = [triggerConditions[evolutionDetails.trigger.name], ...evolutionDetailsString].filter(detail => detail)

  return arrResult
}

const RecursiveEvolutionsComponent = ({ evolutionChains }) => {
  const { pokemonSpeciesData } = useContext(PokemonPageContext)
  const CurrentPokemon = ({ evolutionChains }) => {
    return (
      <div className='pokemon-evolution-pokemon'>
        {pokemonSpeciesData.name === evolutionChains.form_data.species_name
          ? (<p className='evolution-pokemon-text'>{capitalizeStr(evolutionChains.form_data.species_name)}</p>)
          : (<Link to={`/pokemon/${evolutionChains.form_data.species_name}`} className='evolution-pokemon-text'>
              {capitalizeStr(evolutionChains.form_data.species_name)}
            </Link>)
      }

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
              {pokemonEvolutionDetails(evoDetails).map((detail, key) => (
                <p key={key} className={key > 0 ? 'evolution-secondary-text' : 'evolution-primary-text'}>{detail}</p>
              ))}
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
        <div key={evolTree.form_data.id} className={`${className} pokemon-evolution-tree`}
        style={{ backgroundColor: defineColor({ type: evolTree.form_data.types[0].name, priority: 'secondary' }) }}>
          <RecursiveEvolutionsComponent evolutionChains={evolTree} />
        </div>
      ))}
    </div>
  )
}
