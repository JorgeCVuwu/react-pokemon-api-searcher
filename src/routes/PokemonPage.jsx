import '../styles/pokemon-info.css'

import { useParams } from 'react-router-dom'
import { useSetPokemonInfo } from '../hooks/useSetPokemonInfo.js'
import { PokemonInfo } from '../components/PokemonInfo.jsx'

import { PokemonPageProvider } from '../context/pokemonPage.jsx'

import { useGetPokemonInfo } from '../hooks/useGetPokemonInfo.js'
import { useEvolutions } from '../hooks/useEvolutions.js'

import { capitalizeStr } from '../utils/utils.js'

function PokemonPageComponent () {
  const { name } = useParams()

  useSetPokemonInfo(name)

  const { pokemonSpeciesData, pokemonDefaultData, pokemonFormsData } = useGetPokemonInfo()
  useEvolutions()

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
