import { useState, useRef } from 'react'

import { useSelectorData } from '../hooks/useSelectorData.js'

export function useAutocomplete (url) {
  const [autocompleteOptions, setAutocompleteOptions] = useState([])
  const { data } = useSelectorData(url)
  const inputRef = useRef()

  //   useEffect(() => {
  //     if (data) {
  //       setAutocompleteOptions(data.results)
  //     }
  //   }
  //   , [data])

  //   useEffect(() => {
  //   }, [autocompleteOptions])

  const filterAutocomplete = (input) => {
    setAutocompleteOptions(data.results.filter((value) => value.name.startsWith(input)).slice(0, 10))
  }

  const changeInputValue = (value) => {
    inputRef.current.value = value
    setAutocompleteOptions([])
  }

  return { inputRef, autocompleteOptions, filterAutocomplete, changeInputValue }
}
