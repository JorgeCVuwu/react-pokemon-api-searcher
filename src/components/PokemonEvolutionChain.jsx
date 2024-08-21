import React from 'react'
import { useEvolutions } from '../hooks/useEvolutions.js'

import { capitalizeStr } from '../utils/utils.js'

import { POKEMON_TYPE_COLORS } from '../constants/constants.js'

import '../styles/evolution-tree.css'

const pokemonEvolutionTriggers = {
  'level-up': 1,
  trade: 2,
  'use-item': 3
}

const pokemonEvolutionDetails = (pokemon) => ({

})

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
