import { useParams } from 'react-router-dom'
import { useGetPokemonInfo } from '../hooks/useGetPokemonInfo.js'

export function PokemonPage () {
  const { name } = useParams()

  const { pokemonSpeciesData, pokemonFormsData } = useGetPokemonInfo(name)

  return (
    pokemonSpeciesData && pokemonFormsData.length > 0 && (
    <main>
        <h1>{pokemonSpeciesData.name}</h1>
        <img src={pokemonFormsData[0].front_sprite}/>
    </main>
    ))
}
