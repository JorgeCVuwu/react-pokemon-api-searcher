import { useState, useEffect, useContext } from 'react'

import { useGetPokemonInfo } from './useGetPokemonInfo'

import { PokemonPageContext } from '../context/pokemonPage.jsx'

import { POKEMON_FORMS_ACCEPTED, NOT_CONSIDERED_FORMS } from '../constants/constants.js'
import { compareArraysEqual } from '../utils/utils.js'

export function useShowFormAttributes ({ parameter, mode }) {
  const [showForm, setShowForm] = useState()
  const { pokemonDefaultData, pokemonFormsData } = useGetPokemonInfo()
  const [chargedShowForm, setChargedShowForm] = useState(false)
  const { charged } = useContext(PokemonPageContext)

  useEffect(() => {
    setChargedShowForm(false)
    let showFormObj = {}

    const modeStructure = (form, parameter) => ({
      default: { structure: form[parameter], considerValidForms: true },
      stats: { structure: form.stats, considerValidForms: false } // always is an array
    })

    const dataModeStructure = (form) => {
      const struct = {
        default: Array.isArray(form[parameter]) ? form[parameter].map(value => value.name) : form[parameter],
        stats: form.stats.map(stat => stat[parameter])
      }
      return struct[mode]
    }

    const isValidForm = (form, parameter) => {
      const modeStr = modeStructure(form, parameter)[mode]
      const isValidForm = form.name.includes('-') &&
      POKEMON_FORMS_ACCEPTED.some(suffix => (form.name.includes(suffix)))

      const result = Array.isArray(modeStr.structure)
        ? (!compareArraysEqual(dataModeStructure(form), dataModeStructure(pokemonDefaultData)))
        : modeStr.structure !== pokemonDefaultData[parameter]

      const notConsideredForms = !NOT_CONSIDERED_FORMS.some(str => form.name.includes(str))
      return (result || (isValidForm && modeStr.considerValidForms)) && notConsideredForms
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
