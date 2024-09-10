import '../styles/pokemon-info.css'
import '../styles/pokemon-page.css'

import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { NationalDex } from '../components/NationalDex.tsx'
import { PokemonInfo } from '../components/PokemonInfo.tsx'
import { PokemonEvolutionChain } from '../components/PokemonEvolutionChain.tsx'
import { PokedexEntries } from '../components/PokedexEntries.tsx'
import { PokemonMoveset } from '../components/PokemonMoveset.tsx'

import { PokemonPageProvider, PokemonPageContext } from '../context/pokemonPage.js'

import { capitalizeStr } from '../utils/utils.js'

function PokemonPageComponent({ name }: { name: string }) {

  const { pokemonData, setName } = useContext(PokemonPageContext)

  useEffect(() => {
    setName(name)
  }, [name])

  const isEmptyData = pokemonData && Object.keys(pokemonData).length > 0

  return isEmptyData && (
    <>
      <article id='pokemon-page-article' className='pokemon-page-article'>
        <h1>{capitalizeStr(pokemonData.species_data.name)}</h1>
        <NationalDex />

        <aside id='pokemon-page-aside' className='pokemon-page-info-aside'>
          <PokemonInfo />
        </aside>

        <section id='pokemon-page-description'>
          <h2>Description</h2>
          <p>{`${capitalizeStr(pokemonData.species_data.name)} is a ${pokemonData.default_data.types.map(type => capitalizeStr(type.name)).join('/')} 
            type ${pokemonData.species_data.is_mythical ? 'Mythical' : pokemonData.species_data.is_legendary ? 'Legendary' : ''} Pokémon 
            introduced in ${capitalizeStr(pokemonData.species_data.generation.name, false, true)}.`}
          </p>
        </section>

        <section>
          <h2>Evolutions</h2>
          <PokemonEvolutionChain className='pokemon-page-evol-chain' />
        </section>

        <section>
          <h2>Pokédex entries</h2>
          <PokedexEntries />
        </section>

        <section>
          <h2>Moveset</h2>
          <PokemonMoveset />
        </section>

      </article>
    </>
  )
}

export function PokemonPage() {
  const { name } = useParams()
  return name && (
    <PokemonPageProvider>
      <PokemonPageComponent name={name} />
    </PokemonPageProvider>
  )
}
