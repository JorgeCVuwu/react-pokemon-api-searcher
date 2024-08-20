import { useEvolutions } from '../hooks/useEvolutions.js'
import '../styles/evolution-tree.css'

export function PokemonEvolutionChain ({ className }) {
  const { evolutionChains } = useEvolutions()

  const RecursiveEvolutionsComponent = ({ evolutionChains }) => {
    return evolutionChains && (

              <>
                <div className='pokemon-evolution-pokemon' key={evolutionChains.form_data.id}>
                  <p key={evolutionChains.form_data.id}>{evolutionChains.form_data.name}</p>
                  <img className='pokemon-evolution-image' src={evolutionChains.form_data.sprites.front_default} alt={`Image of ${evolutionChains.form_data.name} in evolution tree`} />
                </div>
                  {evolutionChains.evolves_to.map(evolTree => (
                    <RecursiveEvolutionsComponent key={evolTree.form_data.id} evolutionChains={evolTree}/>
                  ))}
              </>

    )
  }
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
