import { useState, useEffect } from 'react'
import { searchFilterResults } from '../services/filters.js'

export function useSelectorData (url, allResults = true) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const filterUrl = allResults ? url + '?limit=100000&offset=0' : url
    searchFilterResults(filterUrl)
      .then(typeJson => setData(typeJson))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { data, error, loading }
}
