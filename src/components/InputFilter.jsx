import { POKEAPI_PREFIX } from '../constants/constants.js'
import { useAutocomplete } from '../hooks/useAutocomplete.js'

export function InputFilter ({ name, filter, disabled, onChange }) {
  const url = `${POKEAPI_PREFIX}${filter}`
  const { inputRef, autocompleteOptions, showAutoComplete, filterAutocomplete, changeInputValue, checkFocusStatus } = useAutocomplete(url)

  const handleChange = (event) => {
    if (onChange) {
      onChange(event)
    }
    filterAutocomplete(event.target.value)
  }

  const handleClick = (event) => {
    changeInputValue(event.target.textContent)
  }

  const handleFocus = () => {
    checkFocusStatus(true)
  }

  const handleBlur = () => {
    checkFocusStatus(false)
  }

  const autocompletePosition = () => {
    const leftPosition = inputRef.current.offsetLeft
    const topPosition = inputRef.current.offsetTop + inputRef.current.offsetHeight
    const width = inputRef.offsetWidth
    return { leftPosition, topPosition, width }
  }

  return (
    <>
      <label htmlFor={`pokemon-${filter}`}>{`Pokémon ${name}:`}</label>
      <input ref={inputRef} id={`pokemon-${name}`} name={name} placeholder={`Put a ${name}`} disabled={disabled} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} autoComplete="off"/>
      { showAutoComplete &&
        <ul className='autocomplete-container' style={{ left: autocompletePosition().leftPosition, top: autocompletePosition().topPosition, width: autocompletePosition().width }}>
          {autocompleteOptions.map((json) => (
            <li key={json.id} className='autocomplete-element' onClick={handleClick}>{json.name}</li>
          ))}
        </ul>
      }
    </>
  )
}
