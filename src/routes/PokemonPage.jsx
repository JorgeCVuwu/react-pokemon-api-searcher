import '../styles/pokemon-info.css'
import '../styles/pokemon-page.css'

import { useParams } from 'react-router-dom'
import { useSetPokemonInfo } from '../hooks/useSetPokemonInfo.js'
import { useGetPokemonInfo } from '../hooks/useGetPokemonInfo.js'

import { PokemonInfo } from '../components/PokemonInfo.jsx'
import { PokemonEvolutionChain } from '../components/PokemonEvolutionChain.jsx'

import { PokemonPageProvider } from '../context/pokemonPage.jsx'

import { capitalizeStr } from '../utils/utils.js'

function PokemonPageComponent () {
  const { name } = useParams()

  useSetPokemonInfo(name)

  const { pokemonSpeciesData, pokemonDefaultData, pokemonFormsData } = useGetPokemonInfo()

  return (
    pokemonSpeciesData && pokemonDefaultData && pokemonFormsData && (
      <main>
          <article id='pokemon-page-article' className='pokemon-page-article'>
            <h1>{capitalizeStr(pokemonSpeciesData.name)}</h1>

            <aside id='pokemon-page-aside' className='pokemon-page-info-aside'>
                <PokemonInfo/>
            </aside>

            <section id='pokemon-page-description'>
              <h2>Description</h2>
              <p>{`${capitalizeStr(pokemonSpeciesData.name)} is a ${pokemonDefaultData.types.map(type => capitalizeStr(type.name)).join('/')} 
              type ${pokemonSpeciesData.is_mythical ? 'Mythical' : pokemonSpeciesData.is_legendary ? 'Legendary' : ''} Pokémon 
              introduced in ${capitalizeStr(pokemonSpeciesData.generation.name, false, true)}.`}</p>
              <p>

              </p>
            </section>

            <section>
              <h2>Evolutions</h2>
              <PokemonEvolutionChain className={'pokemon-page-evol-chain'}/>
            </section>

          </article>
      </main>
    ))
}

export function PokemonPage () {
  return (
    <PokemonPageProvider>
      <PokemonPageComponent/>
    </PokemonPageProvider>
  )
}
