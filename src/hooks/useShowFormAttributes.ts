import { useState, useEffect, useContext } from 'react'

import { PokemonPageContext } from '../context/pokemonPage.tsx'

import { POKEMON_FORMS_ACCEPTED, NOT_CONSIDERED_FORMS } from '../constants/constants.ts'
import { compareArraysEqual } from '../utils/utils.ts'

export function useShowFormAttributes ({ parameter, mode }) {
  const [showForm, setShowForm] = useState()
  const [chargedShowForm, setChargedShowForm] = useState(false)
  const { pokemonDefaultData, pokemonFormsData, charged } = useContext(PokemonPageContext)

  useEffect(() => {
    setChargedShowForm(false)
    let showFormObj = {}

    // struct form depending on mode, establishing the prpperty structure of data and displayable values
    const modeStructures = ({ form, parameter, mode = 'default' }) => {
      const result = {
        default: {
          consider_valid_forms: true,
          structure: form[parameter],
          data_values: Array.isArray(form[parameter]) ? form[parameter].map(value => value.name) : form[parameter]
        },
        stats: {
          consider_valid_forms: false,
          structure: form.stats,
          data_values: form.stats.map(stat => stat[parameter])
        },
        types: {
          consider_valid_forms: true,
          structure: form.types,
          data_values: form.types.map(type => type.name)
        }
      }
      return result?.[mode] ?? result.default
    }

    const isValidForm = (form, parameter) => {
      const modeStruct = modeStructures({ form, parameter, mode })
      const defaultFormStruct = modeStructures({ form: pokemonDefaultData, parameter, mode })

      const isValidForm = form.name.includes('-') &&
      POKEMON_FORMS_ACCEPTED.some(suffix => (form.name.endsWith(suffix)))

      const result = Array.isArray(modeStruct.structure)
        ? (!compareArraysEqual(modeStruct.data_values, defaultFormStruct.data_values))
        : modeStruct.structure !== pokemonDefaultData[parameter]

      const notConsideredForms = !NOT_CONSIDERED_FORMS.some(str => form.name.includes(str))
      return (result || (isValidForm && modeStruct.consider_valid_forms)) && notConsideredForms
    }

    pokemonFormsData.forEach(form => {
      const result = isValidForm(form, parameter)
      showFormObj = {
        ...showFormObj,
        forms: { ...showFormObj?.forms, [form.id]: result },
        existing_valid_forms: showFormObj?.existing_valid_forms || result
      }
    })

    setShowForm(showFormObj)
    if (charged) {
      setChargedShowForm(true)
    }
  }, [pokemonDefaultData, pokemonFormsData])

  return { showForm, chargedShowForm }
}
