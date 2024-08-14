import { useGetPokemonInfo } from '../hooks/useGetPokemonInfo.js'

import { PokemonFormsAttributes } from './PokemonFormsAttributes.jsx'

import { POKEMON_TYPE_COLORS, POKEMON_STATS_ABREVIATIONS } from '../constants/constants.js'
import { capitalizeStr } from '../utils/utils.js'

export function PokemonInfo () {
  const { pokemonSpeciesData, pokemonDefaultData, pokemonFormsData, charged } = useGetPokemonInfo()

  return (
    (
        <div className='pokemon-page-info' style={{ backgroundColor: POKEMON_TYPE_COLORS[pokemonDefaultData.types[0].name] }}>
            <h2 className='two-col'>{capitalizeStr(pokemonSpeciesData.name)}</h2>
            <div className='two-col pokemon-page-element'>
                <div className='pokemon-multiple-forms-element'>
                    <img className='pokemon-page-main-image' src={pokemonDefaultData.sprites.front_default} alt={`Front sprite of ${pokemonSpeciesData.name}.`}></img>
                    { pokemonFormsData.length > 0 && <small>{capitalizeStr(pokemonDefaultData.name, true)}</small> }
                </div>
                { charged && pokemonFormsData.length > 0 && (
                  <div className='pokemon-image-forms-container'>
                        {pokemonFormsData.map(form => (
                        <div key={form.id} className='pokemon-multiple-forms-element'>
                            <img className='pokemon-page-forms-image' src={form.sprites.front_default} alt={form.name} />
                            <small>{capitalizeStr(form.name, true)}</small>
                        </div>
                        ))}
                  </div>
                )}
            </div>
            <section className='two-col'>
                <h3 className='pokemon-info-subtitle'>{pokemonDefaultData.types.length > 1 ? 'Types' : 'Type'}</h3>
                <div className='pokemon-page-element pokemon-page-flex-container'>
                {pokemonDefaultData.types.map(type => (
                    <img key={type.id} className='pokemon-page-type-image' src={`../../public/media/types/sword-shield/${type.id}.png`} />
                ))}
                </div>
            </section>
            <section className='two-col'>
                <h3 className='pokemon-info-subtitle'>{pokemonDefaultData.abilities.length > 1 ? 'Abilities' : 'Ability'}</h3>
                <PokemonFormsAttributes parameter='abilities'/>
            </section>
            <section className='two-col'>
                <h3 className='pokemon-info-subtitle'>Base stats</h3>
                <div className='pokemon-page-element pokemon-page-flex-container'>
                    {pokemonDefaultData.base_stats.map(stat => (
                        <div key={stat.name} className='pokemon-page-rectangle-container'>
                            <h4>{POKEMON_STATS_ABREVIATIONS[stat.name]}</h4>
                            <p>{stat.base_stat}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className='two-col'>
                <h3 className='pokemon-info-subtitle'>EV yield</h3>
                <div className='pokemon-page-element pokemon-page-flex-container'>
                    {pokemonDefaultData.base_stats.map(stat => (
                        <div key={stat.name} className='pokemon-page-rectangle-container'>
                            <h4>{POKEMON_STATS_ABREVIATIONS[stat.name]}</h4>
                            <p>{stat.effort}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h3>Height</h3>
                <PokemonFormsAttributes parameter='height'/>
            </section>
            <section>
                <h3>Weight</h3>
                <PokemonFormsAttributes parameter='weight'/>
            </section>

        </div>
    )
  )
}
