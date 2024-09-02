import { useContext } from 'react'
import { PokemonPageContext } from '../context/pokemonPage.jsx'

import { PokemonFormsAttributes } from './PokemonFormsAttributes.jsx'

import { capitalizeStr } from '../utils/utils.js'

export function PokemonInfo () {
  const { pokemonSpeciesData, pokemonDefaultData, pokemonFormsData, pokemonColors, charged } = useContext(PokemonPageContext)

  return (
    pokemonColors && (
      <div className='pokemon-page-info' style={{ backgroundColor: pokemonColors.primary }}>
        <h2 className='two-col'>{capitalizeStr(pokemonSpeciesData.name)}</h2>
        <div className='two-col pokemon-page-element'>
          <div className='pokemon-multiple-forms-element'>
            <img className='pokemon-page-main-image' src={pokemonDefaultData.sprites.front_default} alt={`Front sprite of ${pokemonSpeciesData.name}.`} />
            {pokemonFormsData.length > 0 && <small>{capitalizeStr(pokemonDefaultData.name, true)}</small>}
          </div>
          {charged && pokemonFormsData.length > 0 && (
            <div className='pokemon-image-forms-container'>
              {pokemonFormsData.map(form => (
                <div key={form.id} className='pokemon-multiple-forms-element'>
                  <img className='pokemon-page-forms-image' src={form.sprites.front_default} alt={`Front sprite of ${form.name}.`} />
                  <small>{capitalizeStr(form.name, true)}</small>
                </div>
              ))}
            </div>
          )}
        </div>
        <section className='two-col'>
          <h3 className='pokemon-info-subtitle'>{pokemonDefaultData.types.length > 1 ? 'Types' : 'Type'}</h3>
          <PokemonFormsAttributes mode='types' />
        </section>
        <section className='two-col'>
          <h3 className='pokemon-info-subtitle'>{pokemonDefaultData.abilities.length > 1 ? 'Abilities' : 'Ability'}</h3>
          <PokemonFormsAttributes parameter='abilities' />
        </section>
        <section className='two-col'>
          <h3 className='pokemon-info-subtitle'>Base stats</h3>
          <PokemonFormsAttributes parameter='base_stat' mode='stats' />
        </section>
        <section className='two-col'>
          <h3 className='pokemon-info-subtitle'>EV yield</h3>
          <PokemonFormsAttributes parameter='effort' mode='stats' />
        </section>
        <section>
          <h3>Height</h3>
          <PokemonFormsAttributes parameter='height' />
        </section>
        <section>
          <h3>Weight</h3>
          <PokemonFormsAttributes parameter='weight' />
        </section>

      </div>
    )
  )
}
