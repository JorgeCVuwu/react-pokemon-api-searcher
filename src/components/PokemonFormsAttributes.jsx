import { useContext } from 'react'
import { useShowFormAttributes } from '../hooks/useShowFormAttributes.js'

import { PokemonPageContext } from '../context/pokemonPage.jsx'

import { capitalizeStr } from '../utils/utils.js'
import { POKEMON_STATS_ABREVIATIONS, STAT_COLORS } from '../constants/constants.js'

const ATTRIBUTE_FUNCTIONS = {
  height: (val) => `${val / 10} m`,
  weight: (val) => `${val / 10} kg`
}

function PokemonAttributeData ({ form, parameter, showForm, isDefault = false }) {
  const areMultipleForms = (!isDefault || showForm?.existing_valid_forms)

  return (
    <div className={areMultipleForms ? 'pokemon-page-default-container' : ''}>
      {Array.isArray(form[parameter])
        ? (
          <div className='pokemon-page-flex-container'>
            {form[parameter].map(value => (
              <div key={value.name} className='pokemon-page-item-container'>
                <div className=''>
                  <p>{capitalizeStr(value.name)}</p>
                  {parameter === 'abilities' && value.is_hidden && <small className='pokemon-page-'>hidden ability</small>}
                </div>
              </div>
            ))}
          </div>
          )
        : (
          <div className=''>
            <p>{ATTRIBUTE_FUNCTIONS?.[parameter] ? ATTRIBUTE_FUNCTIONS[parameter](form[parameter]) : form[parameter]}</p>
          </div>
          )}
      {areMultipleForms && (
        <small>{capitalizeStr(form.name)}</small>
      )}
    </div>
  )
}

function FormStats ({ form, parameter, showForm, isDefault = false }) {
  const areMultipleForms = (!isDefault || showForm?.existing_valid_forms)
  return (
    <div>
      <div className='pokemon-page-flex-container'>
        {form.stats.map(stat => (
          <div key={stat.name} className='pokemon-page-rectangle-container' style={{ backgroundColor: STAT_COLORS[stat.name] }}>
            <p>{POKEMON_STATS_ABREVIATIONS[stat.name]}</p>
            <p>{stat[parameter]}</p>
          </div>
        ))}
      </div>
      {areMultipleForms && (
        <small>{capitalizeStr(form.name)}</small>
      )}
    </div>
  )
}

function FormTypes ({ form, showForm, isDefault = false }) {
  const areMultipleForms = (!isDefault || showForm?.existing_valid_forms)
  return (
    <div>
      <div className='pokemon-page-flex-container'>
        {form.types.map(type => (
          <img key={type.id} className='pokemon-page-type-image' src={`../../public/media/types/sword-shield/${type.id}.png`} alt={`Image containing ${type.name} type.`} />
        ))}
      </div>
      {areMultipleForms && (
        <small>{capitalizeStr(form.name)}</small>
      )}
    </div>
  )
}

export function PokemonFormsAttributes ({ parameter, mode = 'default' }) {
  const { showForm, chargedShowForm } = useShowFormAttributes({ parameter, mode })
  const { pokemonDefaultData, pokemonFormsData } = useContext(PokemonPageContext)

  const DefaultAndFormsComponent = ({ Component }) => {
    return (
      <div className='pokemon-page-element pokemon-page-forms-flex'>
        <Component form={pokemonDefaultData} showForm={showForm} parameter={parameter} isDefault />
        {pokemonFormsData.length > 0 && chargedShowForm && (
          pokemonFormsData.map(form => (showForm.forms[form.id] &&
            <Component key={form.id} form={form} showForm={showForm} parameter={parameter} />
          ))
        )}
      </div>
    )
  }

  const componentMode = {
    default: PokemonAttributeData,
    stats: FormStats,
    types: FormTypes
  }

  return (
    <DefaultAndFormsComponent Component={componentMode[mode]} />
  )
}
