import { useState, useEffect, useRef, useContext } from 'react'

import { useSelectorData } from './useSelectorData.ts'

import { PokemonSearchContext } from '../context/pokemonSearch.tsx'

import { toKebabCase } from '../utils/utils.ts'

import { filtersProps } from '../services/interfaces/project/filters.ts'

interface UseInput {
  url: string
}

export function useInput({ url }: UseInput) {
  const [autocompleteOptions, setAutocompleteOptions] = useState<filtersProps['results']>([])
  const [showAutoComplete, setShowAutocomplete] = useState<boolean>(false)
  const [focusedInput, setFocusedInput] = useState<boolean>(false)
  const [hideValidationError, setHideValidationError] = useState<boolean>(true)

  const { inputs, setInputs } = useContext(PokemonSearchContext)

  const inputRef = useRef<HTMLInputElement>(null)

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

  const updateInput = (): void => {
    if (data && inputRef.current) {
      const inputCurrent = inputRef.current
      const validate = inputCurrent.value === '' || data.results.some(value => toKebabCase(value.name) === toKebabCase(inputCurrent.value))
      setInputs(input => ({
        ...input,
        [inputCurrent.name]: {
          ...input[inputCurrent.name],
          value: inputCurrent.value,
          validated: validate
        }
      }))
    }
  }

  const filterAutocomplete = (): void => {
    if (inputRef.current) {
      const input = inputRef.current.value
      if (input === '') {
        setAutocompleteOptions([])
      }
      else if (data !== null) {
        setAutocompleteOptions(data.results.filter((value) => value.name.startsWith(toKebabCase(input))).slice(0, 10))
      }
    }
  }

  const autocompleteInputValue = (value: string): void => {
    if (inputRef.current) {
      inputRef.current.value = value

      setAutocompleteOptions([])
    }
  }

  const checkFocusStatus = (isFocused: boolean): void => {
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
