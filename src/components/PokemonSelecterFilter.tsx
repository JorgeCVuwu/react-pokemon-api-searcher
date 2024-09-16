import { POKEAPI_PREFIX } from '../constants/constants.ts'
import { useSelectorData } from '../hooks/useSelectorData.ts'

import { capitalizeStr, deleteDashes, capitalizeRomanNumerals } from '../utils/utils.js'

interface PokemonSelecterFilterProps {
  id: string,
  name: string,
  filter: string,
  ignoreResults?: string[],
  disabled: boolean,
  romanNumerals?: boolean
}
export function PokemonSelectorFilter({ id, name, filter, ignoreResults, disabled, romanNumerals = false }: PokemonSelecterFilterProps): JSX.Element {
  const url = `${POKEAPI_PREFIX}${filter}`
  const { data, error, loading, selectRef, updateInput } = useSelectorData(url)

  const renderOption = (results: { name: string, id: number }[]) => {
    return (
      results.map(result => (
        <option key={result.id} value={result.id}>{capitalizeStr(romanNumerals ? capitalizeRomanNumerals(result.name) : result.name)}</option>
      ))
    )
  }

  const handleChange = () => {
    updateInput()
  }

  if (loading) {
    return (
      <select />
    )
  }

  if (error || !data) {
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
          : renderOption(data.results)}
      </select>
    </div>
  )
}
