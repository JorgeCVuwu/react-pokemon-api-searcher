import { useParams } from 'react-router-dom'
import { useGetPokemonInfo } from '../hooks/useGetPokemonInfo.js'
import { PokemonInfo } from '../components/PokemonInfo.jsx'

import { PokemonPageProvider } from '../context/pokemonPage.jsx'

function PokemonPageComponent () {
  const { name } = useParams()

  const { pokemonSpeciesData, pokemonFormsData, pokemonDefaultData } = useGetPokemonInfo(name)

  return (
    pokemonSpeciesData && pokemonFormsData.length > 0 && pokemonDefaultData && (
      <main>
          <article>
            <h1>{pokemonSpeciesData.name}</h1>

            <aside className='pokemon-page-info-aside'>
              <PokemonInfo pokemonSpeciesData={pokemonSpeciesData} pokemonFormsData={pokemonFormsData} pokemonDefaultData={pokemonDefaultData} />
            </aside>
          </article>

          {/* <img src={pokemonDefaultData.front_sprite}></img> */}
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
