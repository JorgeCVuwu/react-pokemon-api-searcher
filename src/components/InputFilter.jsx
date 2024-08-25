import { useNavigate } from 'react-router-dom'
import { useInput } from '../hooks/useInput.js'

import { POKEAPI_PREFIX } from '../constants/constants.js'
import { capitalizeStr, toKebabCase } from '../utils/utils.js'

export function InputFilter ({ name, filter, disabled, onChange, pokemonSearcher = true }) {
  const url = `${POKEAPI_PREFIX}${filter}`
  const {
    inputRef,
    autocompleteOptions, showAutoComplete, hideValidationError,
    filterAutocomplete, autocompleteInputValue, checkFocusStatus, updateInput
  } = useInput({ url })
  const navigate = useNavigate()

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

  const searchFromSearchBar = (event) => {
    event.preventDefault()
    // const form = event.target.closest('form')
    const inputInfo = inputRef.current.value

    hideValidationError
      ? navigate(`/pokemon/${toKebabCase(inputInfo)}`)
      : navigate('/not-found')

    // form.submit()
  }

  const AutocompleteOptions = ({ inputRef }) => {
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
      <ul className='autocomplete-container' style={{ top: autoCompPosition.topPosition }}>
      {autocompleteOptions.map((json) => (
        <li key={json.id} className='autocomplete-element' onPointerDown={handlePointerDown}>{capitalizeStr(json.name, isName)}</li>
      ))}
    </ul>
    )
  }

  const inputFilter = (
      <div className='input-container'>
      <label htmlFor={`pokemon-${filter}`}>{`Pokémon ${name}:`}</label>
      <input ref={inputRef} id={`pokemon-${name}`} name={name}
      placeholder={`Put a ${name}`} disabled={disabled}
      onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
      autoComplete="off"/>
      { showAutoComplete &&
        <AutocompleteOptions inputRef={inputRef}/>
      }
      {pokemonSearcher
        ? <p className='no-valid-campus' hidden={hideValidationError}>Please, insert a valid {name}.</p>
        : <button type='submit'>Search Pokémon</button>
      }
    </div>
  )

  return pokemonSearcher
    ? inputFilter
    : <form onSubmit={searchFromSearchBar}>
        {inputFilter}
      </form>
}
