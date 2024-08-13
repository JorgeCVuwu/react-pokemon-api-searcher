import { useEffect, useState } from 'react'

import { useGetPokemonInfo } from './useGetPokemonInfo'

import { POKEMON_FORMS_ACCEPTED } from '../constants/constants.js'
import { compareArraysEqual } from '../utils/utils.js'

export function useShowFormAttributes () {
  const [showForm, setShowForm] = useState({})
  const { pokemonDefaultData } = useGetPokemonInfo()

  const showFormAttribute = (parameter, form) => {
    const result = (form && !compareArraysEqual(form[parameter].map(ab => ab.name), pokemonDefaultData[parameter].map(ab => ab.name))) ||
      (pokemonDefaultData.name.includes('-') && POKEMON_FORMS_ACCEPTED.some(suffix => pokemonDefaultData.name.includes(suffix)))

    if (result && !showForm?.[parameter]) {
      setShowForm(current => ({ ...current, [parameter]: true }))
    }

    return result
  }

  useEffect(() => {
  }, [])

  return { showForm, showFormAttribute }
}
