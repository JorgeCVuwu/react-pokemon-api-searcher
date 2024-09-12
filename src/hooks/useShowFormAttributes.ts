import { useState, useEffect, useContext } from 'react'

import { PokemonPageContext } from '../context/pokemonPage.tsx'

import { POKEMON_FORMS_ACCEPTED, NOT_CONSIDERED_FORMS } from '../constants/constants.ts'
import { compareArraysEqual } from '../utils/utils.ts'

import { pokemonProps } from '../services/interfaces/project/pokemon.ts'

interface useShowFormAttributesProps {
  parameter: string,
  mode: string
}
export function useShowFormAttributes({ parameter, mode }: useShowFormAttributesProps) {
  const [showForm, setShowForm] = useState()
  const [chargedShowForm, setChargedShowForm] = useState<boolean>(false)
  const { pokemonData, charged } = useContext(PokemonPageContext)

  useEffect(() => {
    if (pokemonData) {
      setChargedShowForm(false)
      let showFormObj = {}

      // struct form depending on mode, establishing the prpperty structure of data and displayable values
      interface modeStructuresProps {
        form: pokemonProps,
        parameter: string,
        mode: 'default' | 'types' | 'stats'
      }
      const modeStructures = ({ form, parameter, mode = 'default' }: modeStructuresProps) => {
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

      const isValidForm = (form: pokemonProps, parameter: string) => {
        const modeStruct = modeStructures({ form, parameter, mode })
        const defaultFormStruct = modeStructures({ form: pokemonData.default_data, parameter, mode })

        const isValidForm = form.name.includes('-') &&
          POKEMON_FORMS_ACCEPTED.some(suffix => (form.name.endsWith(suffix)))

        const result = Array.isArray(modeStruct.structure)
          ? (!compareArraysEqual(modeStruct.data_values, defaultFormStruct.data_values))
          : modeStruct.structure !== pokemonData.default_data[parameter]

        const notConsideredForms = !NOT_CONSIDERED_FORMS.some(str => form.name.includes(str))
        return (result || (isValidForm && modeStruct.consider_valid_forms)) && notConsideredForms
      }

      pokemonData.forms_data.forEach(form => {
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
    }
  }, [charged])

  return { showForm, chargedShowForm }
}
