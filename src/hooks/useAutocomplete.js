import { useState, useEffect, useRef } from 'react'

import { useSelectorData } from '../hooks/useSelectorData.js'

import { toKebabCase } from '../utils/utils.js'

export function useAutocomplete ({ url, validationCallback }) {
  const [autocompleteOptions, setAutocompleteOptions] = useState([])
  const [showAutoComplete, setShowAutocomplete] = useState(false)
  const [focusedInput, setFocusedInput] = useState(false)
  const [validateInput, setValidateInput] = useState(true)
  const [hideValidationError, setHideValidationError] = useState(true)

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

  // useEffect(() => {
  //   validationCallback(validateInput)
  // }, [validateInput])

  const checkValidation = () => {
    if (data) {
      const validate = data.results.some(value => toKebabCase(value.name) === toKebabCase(inputRef.current.value))

      setValidateInput(!validate)
      setHideValidationError(inputRef.current.value === '' || validate)
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
    validateInput,
    hideValidationError,
    checkValidation,
    filterAutocomplete,
    autocompleteInputValue,
    checkFocusStatus
  }
}
