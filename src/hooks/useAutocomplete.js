import { useState, useEffect, useRef } from 'react'

import { useSelectorData } from '../hooks/useSelectorData.js'

import { toKebabCase } from '../utils/utils.js'

export function useAutocomplete (url) {
  const [autocompleteOptions, setAutocompleteOptions] = useState([])
  const [showAutoComplete, setShowAutocomplete] = useState(false)
  const [focusedInput, setFocusedInput] = useState(false)
  const { data } = useSelectorData(url)
  const inputRef = useRef()

  useEffect(() =>
    setShowAutocomplete(autocompleteOptions.length > 0)
  , [autocompleteOptions]
  )

  useEffect(() => {
    setTimeout(() => {
      setShowAutocomplete(current => current && focusedInput)
    }, 10)
  }, [focusedInput])

  const filterAutocomplete = (input) => {
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

  return { inputRef, autocompleteOptions, showAutoComplete, filterAutocomplete, autocompleteInputValue, checkFocusStatus }
}
