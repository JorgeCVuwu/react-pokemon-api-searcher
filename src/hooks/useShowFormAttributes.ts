import { useState, useEffect, useContext } from 'react'

import { PokemonPageContext } from '../context/pokemonPage.tsx'

import { POKEMON_FORMS_ACCEPTED, NOT_CONSIDERED_FORMS } from '../constants/constants.ts'
import { compareArraysEqual } from '../utils/utils.ts'

import { pokemonProps } from '../services/interfaces/project/pokemon.ts'
import { modeType, parameterType, parameterProps, showFormProps } from '../interfaces/pokemonFormsAttributes.ts'

interface useShowFormAttributesProps {
  parameter?: parameterType,
  mode: modeType
}

export function useShowFormAttributes({ parameter, mode }: useShowFormAttributesProps) {
  const [showForm, setShowForm] = useState<showFormProps>()
  const [chargedShowForm, setChargedShowForm] = useState<boolean>(false)
  const { pokemonData, charged } = useContext(PokemonPageContext)

  useEffect(() => {
    if (pokemonData) {
      setChargedShowForm(false)

      interface modeStructuresProps {
        form: pokemonProps,
        mode: modeType,
        parameter: parameterType
      }

      const defaultStructure = ({ form, parameter }: { form: pokemonProps, parameter: parameterProps['default'] }) => {
        return {
          consider_valid_forms: true,
          structure: parameter in form ? form[parameter] : null,
          data_values: Array.isArray(form[parameter]) ? form[parameter].map(value => value.name) : form[parameter]
        }
      }

      const statsStructure = ({ form, parameter }: { form: pokemonProps, parameter: parameterProps['stats'] }) => {
        return {
          consider_valid_forms: false,
          structure: form.stats,
          data_values: form.stats.map(stat => stat[parameter])
        }
      }

      const typesStructure = ({ form }: { form: pokemonProps }) => {
        return {
          consider_valid_forms: true,
          structure: form.types,
          data_values: form.types.map(type => type.name)
        }
      }


      const modeStructures = ({ form, parameter, mode = 'default' }: modeStructuresProps): { consider_valid_forms: boolean, structure: unknown, data_values: unknown } => {
        switch (mode) {
          case 'default':
            return defaultStructure({ form, parameter: parameter as parameterProps['default'] })
          case 'stats':
            return statsStructure({ form, parameter: parameter as parameterProps['stats'] })
          case 'types':
            return typesStructure({ form })
          default:
            return defaultStructure({ form, parameter: parameter as parameterProps['default'] })
        }
      }

      const isValidForm = (form: pokemonProps, parameter: parameterType): boolean => {
        const modeStruct = modeStructures({ form, parameter, mode })
        const defaultFormStruct = modeStructures({ form: pokemonData.default_data, parameter, mode })

        const isValidForm = form.name.includes('-') &&
          POKEMON_FORMS_ACCEPTED.some(suffix => (form.name.endsWith(suffix)))

        const result = Array.isArray(modeStruct.structure)
          ? (!compareArraysEqual(modeStruct.data_values as Array<number | string>, defaultFormStruct.data_values as Array<number | string>))
          : modeStruct.structure !== pokemonData.default_data[parameter as parameterProps['default']]

        const notConsideredForms = !NOT_CONSIDERED_FORMS.some(str => form.name.includes(str))
        return (result || (isValidForm && modeStruct.consider_valid_forms)) && notConsideredForms
      }

      let showFormObj: showFormProps = {}

      pokemonData.forms_data.forEach(form => {
        const result = (parameter !== undefined) && isValidForm(form, parameter)
        showFormObj = {
          ...showFormObj,
          forms: { ...showFormObj?.forms, [form.id]: result },
          existing_valid_forms: showFormObj.existing_valid_forms || result
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
