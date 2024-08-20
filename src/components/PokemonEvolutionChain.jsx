import { useEvolutions } from '../hooks/useEvolutions.js'

export function PokemonEvolutionChain () {
  const { evolutionChains } = useEvolutions()

  const RecursiveEvolutionsComponent = ({ evolutionChains }) => {
    console.log(evolutionChains)
    return (
        <>
            <p>{evolutionChains.species.name}</p>
            {evolutionChains.evolves_to.length > 0 && evolutionChains.evolves_to.forEach(evol => <RecursiveEvolutionsComponent evolutionChains={evol}/>)}
        </>
    )
  }

  return evolutionChains && (
    <RecursiveEvolutionsComponent evolutionChains={evolutionChains.chain} />
  )
}
