import { useState, useEffect, useRef, useContext } from 'react'
import { searchFilterResults } from '../services/filters.ts'
import { PokemonSearchContext } from '../context/pokemonSearch.tsx'

import { filtersProps } from '../services/interfaces/project/filters.ts'


export function useSelectorData(url: string, allResults = true) {
  const [data, setData] = useState<filtersProps | null>(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState<boolean>(true)

  const selectRef = useRef<HTMLSelectElement | null>(null)

  const { setInputs } = useContext(PokemonSearchContext)

  useEffect(() => {
    const filterUrl = allResults ? url + '?limit=100000&offset=0' : url
    searchFilterResults(filterUrl)
      .then(typeJson => setData(typeJson))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  const updateInput = () => {
    if (data && selectRef.current) {
      const selectElement = selectRef.current
      // const validate = selectRef.current.value !== ''
      setInputs(input => ({
        ...input,
        [selectElement.name]: {
          ...input[selectElement.name],
          value: selectElement.value,
          validated: true
        }
      }))
    }
  }

  return { data, error, loading, selectRef, updateInput }
}
