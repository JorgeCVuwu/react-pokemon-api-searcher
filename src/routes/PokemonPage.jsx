import { useParams } from 'react-router-dom'
import { useGetPokemonInfo } from '../hooks/useGetPokemonInfo.js'

export function PokemonPage () {
  const { name } = useParams()

  const { pokemonSpeciesData, pokemonFormsData, pokemonDefaultData } = useGetPokemonInfo(name)

  return (
    pokemonSpeciesData && pokemonFormsData.length > 0 && pokemonDefaultData && (
    <main>
        <h1>{pokemonSpeciesData.name}</h1>
        <img src={pokemonDefaultData.front_sprite}></img>
    </main>
    ))
}
