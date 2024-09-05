import { useState, useEffect, useRef, useContext } from 'react'

import { useSelectorData } from './useSelectorData.ts'

import { PokemonSearchContext } from '../context/pokemonSearch.tsx'

import { toKebabCase } from '../utils/utils.ts'

interface UseInput {
  url: string
}

export function useInput({ url }: UseInput) {
  const [autocompleteOptions, setAutocompleteOptions] = useState([])
  const [showAutoComplete, setShowAutocomplete] = useState(false)
  const [focusedInput, setFocusedInput] = useState(false)
  const [hideValidationError, setHideValidationError] = useState(true)

  const { inputs, setInputs } = useContext(PokemonSearchContext)

  const inputRef = useRef<HTMLInputElement>()

  const { data } = useSelectorData(url)

  useEffect(() =>
    setShowAutocomplete(autocompleteOptions.length > 0)
    , [autocompleteOptions]
  )

  useEffect(() => {
    setTimeout(() => {
      setShowAutocomplete(current => current && focusedInput)
    }, 10)
  }, [focusedInput])

  useEffect(() => {
    if (inputRef.current) {
      setHideValidationError(inputRef.current.value === '' || inputs[inputRef.current.name].validated)
    }
  }, [inputs])

  const updateInput = () => {
    if (data && inputRef.current) {
      const validate = inputRef.current.value === '' || data.results.some(value => toKebabCase(value.name) === toKebabCase(inputRef.current.value))
      setInputs(input => ({ ...input, [inputRef.current.name]: { ...input[inputRef.current.name], value: inputRef.current.value, validated: validate } }))
    }
  }

  const filterAutocomplete = () => {
    if (inputRef.current) {
      const input = inputRef.current.value
      return input === ''
        ? setAutocompleteOptions([])
        : setAutocompleteOptions(data.results.filter((value) => value.name.startsWith(toKebabCase(input))).slice(0, 10))
    }
  }

  const autocompleteInputValue = (value: string) => {
    if (inputRef.current) {
      inputRef.current.value = value

      setAutocompleteOptions([])
    }
  }

  const checkFocusStatus = (isFocused) => {
    setFocusedInput(isFocused)
  }

  return {
    inputRef,
    autocompleteOptions,
    showAutoComplete,
    hideValidationError,
    updateInput,
    filterAutocomplete,
    autocompleteInputValue,
    checkFocusStatus
  }
}
