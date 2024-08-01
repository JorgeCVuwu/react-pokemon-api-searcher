import { useState, useEffect } from 'react'
import { searchFilterResults } from '../services/filters.js'

export function useSelectorData (url) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    searchFilterResults(url)
      .then(typeJson => setData(typeJson))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { data, error, loading }
}
