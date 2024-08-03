import { POKEAPI_PREFIX } from '../constants/constants.js'
import { useAutocomplete } from '../hooks/useAutocomplete.js'

export function InputFilter ({ name, filter, disabled, onInput }) {
  const url = `${POKEAPI_PREFIX}${filter}`
  const { inputRef, autocompleteOptions, filterAutocomplete, changeInputValue } = useAutocomplete(url)

  const handleInput = (event) => {
    if (onInput) {
      onInput(event)
    }
    filterAutocomplete(event.target.value)
  }

  const handleClick = (event) => {
    changeInputValue(event.target.textContent)
  }

  return (
    <>
      <label htmlFor={`pokemon-${filter}`}>{`Pokémon ${name}:`}</label>
      <input ref={inputRef} id={`pokemon-${name}`} name={name} placeholder={`Put a ${name}`} disabled={disabled} onInput={handleInput}/>
      { autocompleteOptions && autocompleteOptions.length > 0 &&
        <ul>
          {autocompleteOptions.map((json) => (
            <li key={json.id} onClick={handleClick}>{json.name}</li>
          ))}
        </ul>
      }
    </>
  )
}
