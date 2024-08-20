import React from 'react'
import { useEvolutions } from '../hooks/useEvolutions.js'
import '../styles/evolution-tree.css'

const RecursiveEvolutionsComponent = ({ evolutionChains }) => {
  const CurrentPokemon = ({ evolutionChains }) => {
    return (
      <div className='pokemon-evolution-pokemon' key={evolutionChains.form_data.id}>
        <p key={evolutionChains.form_data.id}>{evolutionChains.form_data.name}</p>
        <img className='pokemon-evolution-image'
        src={evolutionChains.form_data.sprites.front_default}
        alt={`Image of ${evolutionChains.form_data.name} in evolution tree`}
        />
      </div>
    )
  }

  const EvolComponent = ({ evolutionChains }) => {
    const stage1Evolutions = []
    const stage2Evolutions = []

    evolutionChains.evolves_to.forEach(evol1 => {
      stage1Evolutions.push(<CurrentPokemon evolutionChains={evol1}/>)
      evol1.evolves_to.forEach(evol2 => {
        stage2Evolutions.push(<CurrentPokemon evolutionChains={evol2}/>)
      })
    })

    return (
      <>
      <div>
        <CurrentPokemon evolutionChains={evolutionChains}/>
      </div>
      <div>
        {stage1Evolutions.map((evol1, key) => (
          <React.Fragment key={key}>
          { evol1 }
          </React.Fragment>
        ))}
      </div>
      <div>
        {stage2Evolutions.map((evol2, key) => (
            <React.Fragment key={key}>
            { evol2 }
            </React.Fragment>
        ))}
      </div>
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
        <div key={evolTree.form_data.id} className={`${className} pokemon-evolution-tree`}>
          <RecursiveEvolutionsComponent evolutionChains={evolTree} />
        </div>
      ))}
    </div>
  )
}
