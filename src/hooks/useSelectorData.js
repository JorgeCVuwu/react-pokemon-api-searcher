import { useState, useEffect, useRef, useContext } from 'react'
import { searchFilterResults } from '../services/filters.js'
import { PokemonSearchContext } from '../context/pokemonSearch.jsx'

export function useSelectorData (url, allResults = true) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const selectRef = useRef()

  const { setInputs } = useContext(PokemonSearchContext)

  useEffect(() => {
    const filterUrl = allResults ? url + '?limit=100000&offset=0' : url
    searchFilterResults(filterUrl)
      .then(typeJson => setData(typeJson))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  const updateInput = () => {
    if (data) {
      // const validate = selectRef.current.value !== ''
      setInputs(input => ({
        ...input,
        [selectRef.current.name]: {
          ...input[selectRef.current.name],
          value: selectRef.current.value,
          validated: true
        }
      }))
    }
  }

  return { data, error, loading, selectRef, updateInput }
}
