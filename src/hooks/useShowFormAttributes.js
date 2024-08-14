import { useState, useEffect, useContext } from 'react'

import { useGetPokemonInfo } from './useGetPokemonInfo'

import { PokemonPageContext } from '../context/pokemonPage.jsx'

import { POKEMON_FORMS_ACCEPTED } from '../constants/constants.js'
import { compareArraysEqual } from '../utils/utils.js'

export function useShowFormAttributes ({ parameter }) {
  const [showForm, setShowForm] = useState()
  const { pokemonDefaultData, pokemonFormsData } = useGetPokemonInfo()
  const [chargedShowForm, setChargedShowForm] = useState(false)
  const { charged } = useContext(PokemonPageContext)

  useEffect(() => {
    setChargedShowForm(false)
    let showFormObj = {}

    const isValidForm = (form, parameter) => {
      const parameterAttr = form[parameter]
      const isValidForm = pokemonDefaultData.name.includes('-') && POKEMON_FORMS_ACCEPTED.some(suffix => pokemonDefaultData.name.includes(suffix))
      return Array.isArray(parameterAttr)
        ? (!compareArraysEqual(form[parameter].map(ab => ab.name), pokemonDefaultData[parameter].map(ab => ab.name))) || isValidForm
        : form[parameter] !== pokemonDefaultData[parameter] || isValidForm
    }

    pokemonFormsData.forEach(form => {
      const result = isValidForm(form, parameter)
      showFormObj = {
        ...showFormObj,
        forms: { ...showFormObj?.forms, [form.id]: result },
        existing_valid_forms: result || showFormObj?.existing_valid_forms
      }
    })

    setShowForm(showFormObj)
    if (charged) {
      setChargedShowForm(true)
    }
  }, [pokemonDefaultData, pokemonFormsData])

  return { showForm, chargedShowForm }
}
