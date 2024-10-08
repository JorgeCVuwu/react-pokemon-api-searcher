import { useContext } from 'react'
import { useShowFormAttributes } from '../hooks/useShowFormAttributes.ts'

import { PokemonPageContext } from '../context/pokemonPage.tsx'

import { capitalizeStr } from '../utils/utils.ts'
import { POKEMON_STATS_ABREVIATIONS, STAT_COLORS } from '../constants/constants.ts'

import { pokemonProps } from '../services/interfaces/project/pokemon.ts'
import { modeType, parameterType, parameterProps, showFormProps } from '../interfaces/pokemonFormsAttributes.ts'

const ATTRIBUTE_FUNCTIONS = {
  height: (val: number) => `${val / 10} m`,
  weight: (val: number) => `${val / 10} kg`
}

interface PokemonAttributeDataProps {
  form: pokemonProps,
  parameter?: parameterType,
  showForm: showFormProps,
  isDefault?: boolean
}

function PokemonAttributeData({ form, parameter, showForm, isDefault = false }: PokemonAttributeDataProps): JSX.Element {
  const areMultipleForms = (!isDefault || showForm.existing_valid_forms)
  const formParameterDefault = form[parameter as parameterProps['default']]

  return (
    <div className={areMultipleForms ? 'pokemon-page-default-container' : ''}>
      {parameter && Array.isArray(formParameterDefault)
        ? (
          <div className='pokemon-page-flex-container'>
            {formParameterDefault.map(value => (
              <div key={value.name} className='pokemon-page-item-container'>
                <div className=''>
                  <p>{capitalizeStr(value.name)}</p>
                  {parameter === 'abilities' && 'is_hidden' in value && value.is_hidden && <small className='pokemon-page-'>hidden ability</small>}
                </div>
              </div>
            ))}
          </div>
        )
        : (
          <div className=''>
            <p>
              {((parameter === 'height' || parameter === 'weight') && ATTRIBUTE_FUNCTIONS?.[parameter])
                ? ATTRIBUTE_FUNCTIONS[parameter](form[parameter])
                : parameter && String(formParameterDefault)
              }
            </p>
          </div>
        )}
      {areMultipleForms && (
        <small>{capitalizeStr(form.name)}</small>
      )}
    </div>
  )
}

function FormStats({ form, parameter, showForm, isDefault = false }: PokemonAttributeDataProps): JSX.Element {
  const areMultipleForms = (!isDefault || showForm.existing_valid_forms)
  const statParameter = parameter as parameterProps['stats']
  return (
    <div>
      <div className='pokemon-page-flex-container'>
        {form.stats.map(stat => (
          <div key={stat.name} className='pokemon-page-rectangle-container' style={{ backgroundColor: STAT_COLORS[stat.name] }}>
            <p>{POKEMON_STATS_ABREVIATIONS[stat.name]}</p>
            <p>{stat[statParameter]}</p>
          </div>
        ))}
      </div>
      {areMultipleForms && (
        <small>{capitalizeStr(form.name)}</small>
      )}
    </div>
  )
}

function FormTypes({ form, showForm, isDefault = false }: PokemonAttributeDataProps): JSX.Element {
  const areMultipleForms = (!isDefault || showForm.existing_valid_forms)
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

interface PokemonFormsAttributesProps {
  parameter?: parameterType,
  mode?: modeType
}


export function PokemonFormsAttributes({ parameter, mode = 'default' }: PokemonFormsAttributesProps): JSX.Element {
  const { showForm, chargedShowForm } = useShowFormAttributes({ parameter, mode })
  const { pokemonData, charged } = useContext(PokemonPageContext)

  const DefaultAndFormsComponent = ({ Component }: { Component: (props: PokemonAttributeDataProps) => JSX.Element }): JSX.Element | null => {
    if (!(charged && pokemonData && showForm)) return null
    return (
      <div className='pokemon-page-element pokemon-page-forms-flex'>
        <Component form={pokemonData.default_data} showForm={showForm} parameter={parameter} isDefault />
        {chargedShowForm && (
          pokemonData.forms_data.map(form => (showForm?.forms?.[form.id] &&
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
