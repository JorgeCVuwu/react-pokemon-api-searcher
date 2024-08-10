import { useParams } from 'react-router-dom'
import { useSetPokemonInfo } from '../hooks/useSetPokemonInfo.js'
import { PokemonInfo } from '../components/PokemonInfo.jsx'

import { PokemonPageProvider } from '../context/pokemonPage.jsx'

import '../styles/pokemon-info.css'
import { useGetPokemonInfo } from '../hooks/useGetPokemonInfo.js'

import { capitalizeStr } from '../utils/utils.js'

function PokemonPageComponent () {
  const { name } = useParams()

  useSetPokemonInfo(name)

  const { pokemonSpeciesData, pokemonDefaultData } = useGetPokemonInfo()

  return (
    pokemonSpeciesData && pokemonDefaultData && (
      <main>
          <article className='pokemon-page'>
            <h1>{capitalizeStr(pokemonSpeciesData.name)}</h1>
            <aside className='pokemon-page-info-aside'>
              <PokemonInfo/>
            </aside>
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
