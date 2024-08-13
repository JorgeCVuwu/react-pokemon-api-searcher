import '../styles/pokemon-info.css'

import { useParams } from 'react-router-dom'
import { useSetPokemonInfo } from '../hooks/useSetPokemonInfo.js'
import { PokemonInfo } from '../components/PokemonInfo.jsx'

import { PokemonPageProvider } from '../context/pokemonPage.jsx'

import { useGetPokemonInfo } from '../hooks/useGetPokemonInfo.js'

import { capitalizeStr } from '../utils/utils.js'

function PokemonPageComponent () {
  const { name } = useParams()

  useSetPokemonInfo(name)

  const { pokemonSpeciesData, pokemonDefaultData, pokemonFormsData } = useGetPokemonInfo()

  return (
    pokemonSpeciesData && pokemonDefaultData && pokemonFormsData && (
      <main>
          <article className='pokemon-page'>
            <h1>{capitalizeStr(pokemonDefaultData.name)}</h1>
            <aside className='pokemon-page-info-aside'>
              <PokemonInfo/>
            </aside>
            <section>
              <h2>Description</h2>
              <p>{`${capitalizeStr(pokemonDefaultData.name)} is a ${pokemonDefaultData.types.map(type => capitalizeStr(type.name)).join('/')} 
              type ${pokemonSpeciesData.is_mythical ? 'Mythical' : pokemonSpeciesData.is_legendary ? 'Legendary' : ''} Pokémon 
              introduced in ${capitalizeStr(pokemonSpeciesData.generation.name, false, true)}.`}</p>
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
