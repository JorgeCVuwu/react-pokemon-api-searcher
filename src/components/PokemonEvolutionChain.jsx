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
  1: '(♀)',
  2: '(♂)'
}

const pokemonEvolutionDetails = (evolutionDetails) => {
  if (evolutionDetails.length === 0) return []

  const evolDetailsObj = {
    min_level: evolutionDetails.min_level
      ? 'Level ' + evolutionDetails.min_level
      : null,
    item: getNameDetails(evolutionDetails.item),
    held_item: getNameDetails(evolutionDetails.held_item, 'holding '),
    gender: genders[evolutionDetails.gender] || null,
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
    party_species: getNameDetails(evolutionDetails.party_species, 'holding ', ' in team'),
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

  const arrResult = evolutionDetailsString
    ? [triggerConditions[evolutionDetails.trigger.name], ...evolutionDetailsString].filter(detail => detail)
    : triggerConditions[evolutionDetails.trigger.name]
      ? [triggerConditions[evolutionDetails.trigger.name]]
      : []

  return arrResult
}

const RecursiveEvolutionsComponent = ({ evolutionChains }) => {
  const { pokemonSpeciesData } = useContext(PokemonPageContext)

  const CurrentPokemon = ({ evolutionChains }) => {
    return (
      <div className='pokemon-evolution-pokemon'>
        {pokemonSpeciesData.name === evolutionChains.form_data.species.name
          ? (<p className='evolution-pokemon-text'>{capitalizeStr(evolutionChains.form_data.species.name)}</p>)
          : (<Link to={`/pokemon/${evolutionChains.form_data.species.name}`} className='evolution-pokemon-text'>
              {capitalizeStr(evolutionChains.form_data.species.name)}
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

  const StageDetails = ({ stageDetails }) => (
      <div className='evolution-details-container'>
          <div>
            {pokemonEvolutionDetails(stageDetails).map((detail, key) => (
              <p key={key} className={key > 0 ? 'evolution-secondary-text' : 'evolution-primary-text'}>{detail}</p>
            ))}
            →
          </div>
      </div>
  )

  return (
    <div className='evolution-chain-container'>
      <CurrentPokemon evolutionChains={evolutionChains}/>
        { evolutionChains.evolves_to.length > 0 &&
          <div>
            {evolutionChains.evolves_to.map((evol, key) => (
              <div className='evolution-chain-branch' key={key}>
                <StageDetails stageDetails={evol.evolution_details}/>
                <RecursiveEvolutionsComponent evolutionChains={evol}/>
              </div>
            ))}
          </div>
        }
    </div>
  )
}

export function PokemonEvolutionChain ({ className }) {
  const { evolutionChains } = useEvolutions()

  return evolutionChains && (
    <div className={`${className}`}>
      {evolutionChains.map(evolTree => (
        <div key={evolTree.form_data.id} className={`${className} pokemon-evolution-tree`}
        style={{ backgroundColor: defineColor({ type: evolTree.form_data.types[0].name, priority: 'secondary' }) }}>
          <RecursiveEvolutionsComponent evolutionChains={evolTree} />
        </div>
      ))}
    </div>
  )
}
