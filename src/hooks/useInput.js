import { useState, useEffect, useRef, useContext } from 'react'

import { useSelectorData } from './useSelectorData.js'

import { PokemonSearchContext } from '../context/pokemonSearch.jsx'

import { toKebabCase } from '../utils/utils.js'

export function useInput ({ url, validationCallback }) {
  const [autocompleteOptions, setAutocompleteOptions] = useState([])
  const [showAutoComplete, setShowAutocomplete] = useState(false)
  const [focusedInput, setFocusedInput] = useState(false)
  const [hideValidationError, setHideValidationError] = useState(true)

  const { setInputs } = useContext(PokemonSearchContext)

  const inputRef = useRef()

  const { data } = useSelectorData(url)

  useEffect(() =>
    setShowAutocomplete(autocompleteOptions.length > 0)
  , [autocompleteOptions]
  )

  useEffect(() => {
    setTimeout(() => {
      setShowAutocomplete(current => current && focusedInput)
    }, 10)

    if (focusedInput) {
      setHideValidationError(true)
    }
  }, [focusedInput])

  const checkValidation = () => {
    if (data) {
      const validate = data.results.some(value => toKebabCase(value.name) === toKebabCase(inputRef.current.value))

      setHideValidationError(inputRef.current.value === '' || validate)
      setInputs(inputs => ({ ...inputs, [inputRef.current.name]: { validated: !validate } }))
    }
  }

  const filterAutocomplete = () => {
    const input = inputRef.current.value
    input === ''
      ? setAutocompleteOptions([])
      : setAutocompleteOptions(data.results.filter((value) => value.name.startsWith(toKebabCase(input))).slice(0, 10))
  }

  const autocompleteInputValue = (value) => {
    inputRef.current.value = value
    setAutocompleteOptions([])
  }

  const checkFocusStatus = (isFocused) => {
    setFocusedInput(isFocused)
  }

  return {
    inputRef,
    autocompleteOptions,
    showAutoComplete,
    hideValidationError,
    checkValidation,
    filterAutocomplete,
    autocompleteInputValue,
    checkFocusStatus
  }
}
