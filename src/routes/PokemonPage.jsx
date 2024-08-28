import '../styles/pokemon-info.css'
import '../styles/pokemon-page.css'

import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useSetPokemonInfo } from '../hooks/useSetPokemonInfo.js'

import { NationalDex } from '../components/NationalDex.jsx'
import { PokemonInfo } from '../components/PokemonInfo.jsx'
import { PokemonEvolutionChain } from '../components/PokemonEvolutionChain.jsx'
import { PokedexEntries } from '../components/PokedexEntries.jsx'
import { PokemonMoveset } from '../components/PokemonMoveset.jsx'

import { PokemonPageProvider, PokemonPageContext } from '../context/pokemonPage.jsx'

import { capitalizeStr } from '../utils/utils.js'

function PokemonPageComponent ({ name }) {
  useSetPokemonInfo(name)

  const { pokemonSpeciesData, pokemonDefaultData, pokemonFormsData, pokemonColors } = useContext(PokemonPageContext)

  return (
    pokemonSpeciesData && pokemonDefaultData && pokemonFormsData && pokemonColors && (
      <>

        <article id='pokemon-page-article' className='pokemon-page-article'>
          <h1>{capitalizeStr(pokemonSpeciesData.name)}</h1>
          <NationalDex/>

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

          <section>
            <h2>Pokédex entries</h2>
            <PokedexEntries/>
          </section>

          <section>
            <h2>Moveset</h2>
            <PokemonMoveset/>
          </section>

        </article>
      </>
    ))
}

export function PokemonPage () {
  const { name } = useParams()
  return (
    <PokemonPageProvider>
      <PokemonPageComponent name={name}/>
    </PokemonPageProvider>
  )
}
