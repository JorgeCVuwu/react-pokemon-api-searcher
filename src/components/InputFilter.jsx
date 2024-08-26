import { useNavigate } from 'react-router-dom'
import { useInput } from '../hooks/useInput.js'

import { POKEAPI_PREFIX } from '../constants/constants.js'
import { capitalizeStr, toKebabCase } from '../utils/utils.js'

const AutocompleteOptions = ({ inputRef, autocompleteOptions, handlePointerDown }) => {
  const autocompletePosition = ({ inputRef }) => {
    if (inputRef.current) {
      const topPosition = inputRef.current.offsetTop + inputRef.current.offsetHeight
      const width = inputRef.current.offsetWidth

      return { topPosition, width }
    }
    return null
  }

  const autoCompPosition = autocompletePosition({ inputRef })
  const isName = name === 'name'
  return (
    <ul className='autocomplete-container' style={{ top: autoCompPosition.topPosition, width: autoCompPosition.width }}>
      {autocompleteOptions.map((json) => (
        <li key={json.id} className='autocomplete-element' onPointerDown={handlePointerDown}>{capitalizeStr(json.name, isName)}</li>
      ))}
    </ul>
  )
}

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

  const inputFilter = (
    <div className={`input-container ${pokemonSearcher ? '' : 'search-name-form'}`}>
      {pokemonSearcher && <label htmlFor={`pokemon-${filter}`}>{`Pokémon ${name}:`}</label>}
      <input ref={inputRef} id={`pokemon-${name}`} name={name}
      placeholder={`Put a ${name}`} disabled={disabled}
      onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
      autoComplete="off"/>
      { showAutoComplete &&
        <AutocompleteOptions inputRef={inputRef} autocompleteOptions={autocompleteOptions} handlePointerDown={handlePointerDown}/>
      }
      {pokemonSearcher
        ? <p className='no-valid-campus' hidden={hideValidationError}>Please, insert a valid {name}.</p>
        : <button type='submit'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
      }
    </div>
  )

  return pokemonSearcher
    ? inputFilter
    : <form onSubmit={searchFromSearchBar}>
        {inputFilter}
      </form>
}
