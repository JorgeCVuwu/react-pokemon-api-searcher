import { POKEAPI_PREFIX } from '../constants/constants'
import { useSelectorData } from '../hooks/useSelectorData.js'

import { capitalizeStr, deleteDashes, capitalizeRomanNumerals } from '../utils/utils.js'

export function PokemonSelectorFilter ({ id, name, filter, ignoreResults, disabled, romanNumerals = false }) {
  const url = `${POKEAPI_PREFIX}${filter}`
  const { data, error, loading, selectRef, checkValidation } = useSelectorData(url)

  const renderOption = (results) => {
    return (
      results.map(result => (
        <option key={result.id} value={result.id}>{capitalizeStr(romanNumerals ? capitalizeRomanNumerals(result.name) : result.name)}</option>
      ))
    )
  }

  const handleChange = () => {
    checkValidation()
  }

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
    <div className='input-container'>
      <label htmlFor={id}>{`Pokémon ${deleteDashes(name)}:`}</label>
      <select ref={selectRef} id={id} name={filter} onChange={handleChange} disabled={disabled}>
          <option value=''>None</option>
          {ignoreResults
            ? renderOption(data.results.filter(result => !ignoreResults.includes(result.name)))
            : renderOption(data.results)
          }
      </select>
    </div>
  )
}
