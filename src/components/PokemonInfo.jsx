import '../styles/pokemon-info.css'

import { POKEMON_TYPE_COLORS } from '../constants/constants.js'

export function PokemonInfo ({ pokemonSpeciesData, pokemonFormsData, pokemonDefaultData }) {
  const condition = pokemonSpeciesData && pokemonFormsData.length > 0 && pokemonDefaultData

  return (
    condition && (
        <div className='pokemon-page-info' style={{ backgroundColor: POKEMON_TYPE_COLORS[pokemonDefaultData.types[0].name] }}>
            <h2>{pokemonSpeciesData.name}</h2>
            <img></img>
        </div>
    )
  )
}
