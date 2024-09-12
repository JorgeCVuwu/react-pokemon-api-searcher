import { useContext } from 'react'
import { PokemonPageContext } from '../context/pokemonPage.tsx'

import { PokemonFormsAttributes } from './PokemonFormsAttributes.tsx'

import { capitalizeStr } from '../utils/utils.ts'

export function PokemonInfo() {
  const { pokemonData, charged, changingCharge } = useContext(PokemonPageContext)

  return pokemonData && (
    (
      <div className='pokemon-page-info' style={{ backgroundColor: pokemonData.colors.primary }}>
        <h2 className='two-col'>{capitalizeStr(pokemonData.species_data.name)}</h2>
        <div className='two-col pokemon-page-element'>
          <div className='pokemon-multiple-forms-element'>
            <div className="pokemon-page-main-image">
              {!changingCharge && (
                <img
                  className="pokemon-page-main-image"
                  src={pokemonData.default_data.sprites.front_default}
                  alt={`Front sprite of ${pokemonData.species_data.name}.`}
                />
              )}
            </div>
            {pokemonData.forms_data.length > 0 && (
              <small>{capitalizeStr(pokemonData.default_data.name, true)}</small>
            )}
          </div>
          {charged && pokemonData.forms_data.length > 0 && (
            <div className='pokemon-image-forms-container'>
              {pokemonData.forms_data.map(form => (
                <div key={form.id} className='pokemon-multiple-forms-element'>
                  <img className='pokemon-page-forms-image' src={form.sprites.front_default} alt={`Front sprite of ${form.name}.`} />
                  <small>{capitalizeStr(form.name, true)}</small>
                </div>
              ))}
            </div>
          )}
        </div>
        <section className='two-col'>
          <h3 className='pokemon-info-subtitle'>{pokemonData.default_data.types.length > 1 ? 'Types' : 'Type'}</h3>
          <PokemonFormsAttributes mode='types' />
        </section>
        <section className='two-col'>
          <h3 className='pokemon-info-subtitle'>{pokemonData.default_data.abilities.length > 1 ? 'Abilities' : 'Ability'}</h3>
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
