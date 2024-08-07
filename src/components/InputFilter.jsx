import { POKEAPI_PREFIX } from '../constants/constants.js'

import { useInput } from '../hooks/useInput.js'

import { capitalizeStr } from '../utils/utils.js'

export function InputFilter ({ name, filter, disabled, onChange }) {
  const url = `${POKEAPI_PREFIX}${filter}`
  const {
    inputRef,
    autocompleteOptions, showAutoComplete, hideValidationError,
    filterAutocomplete, autocompleteInputValue, checkFocusStatus, updateInput
  } = useInput({ url })

  const handlePointerDown = (event) => {
    autocompleteInputValue(event.target.textContent)
    updateInput()
  }

  const handleChange = (event) => {
    if (onChange) {
      onChange(event)
    }
    updateInput()
    filterAutocomplete()
  }

  const handleFocus = () => {
    checkFocusStatus(true)
  }

  const handleBlur = () => {
    checkFocusStatus(false)
  }

  const autocompletePosition = () => {
    if (inputRef.current) {
      const topPosition = inputRef.current.offsetTop + inputRef.current.offsetHeight

      return { topPosition }
    }
    return null
  }

  const autoCompPosition = autocompletePosition()
  const isName = name === 'name'

  return (
    <div className='input-container'>
      <label htmlFor={`pokemon-${filter}`}>{`Pokémon ${name}:`}</label>
      <input ref={inputRef} id={`pokemon-${name}`} name={name} placeholder={`Put a ${name}`} disabled={disabled} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} autoComplete="off"/>
      { showAutoComplete &&
        <ul className='autocomplete-container' style={{ top: autoCompPosition.topPosition }}>
          {autocompleteOptions.map((json) => (
            <li key={json.id} className='autocomplete-element' onPointerDown={handlePointerDown}>{capitalizeStr(json.name, isName)}</li>
          ))}
        </ul>
      }
      <p className='no-valid-campus' hidden={hideValidationError}>Please, insert a valid {name}.</p>
    </div>
  )
}
