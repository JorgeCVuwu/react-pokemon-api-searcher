import { POKEAPI_PREFIX } from '../constants/constants'
import { useSelectorData } from '../hooks/useSelectorData.js'

export function PokemonSelectorFilter ({ id, filter, ignoreResults }) {
  const url = `${POKEAPI_PREFIX}${filter}`
  const { data, error, loading } = useSelectorData(url)

  if (loading) {
    return (
    <select></select>
    )
  }

  if (error) {
    return (
    <p>Error charging {filter} selector</p>
    )
  }

  return (
    <select id={id} name={filter} selected>
        <option value=''>Select {filter}...</option>
        {ignoreResults
          ? data.results.filter(result => !ignoreResults.includes(result.name)).map(result => (
            <option key={result.id} value={result.id}>{result.name}</option>
          ))
          : data.results.map(result => (
            <option key={result.id} value={result.id}>{result.name}</option>
          ))
        }
    </select>
  )
}
