import { RefObject } from 'react'

import { useNavigate } from 'react-router-dom'
import { useInput } from '../hooks/useInput.ts'

import { POKEAPI_PREFIX } from '../constants/constants.ts'
import { capitalizeStr, toKebabCase } from '../utils/utils.ts'

const AutocompleteOptions = ({ inputRef, autocompleteOptions, handlePointerDown }: { inputRef: RefObject<HTMLInputElement> }) => {
  const autocompletePosition = (): { topPosition: number, width: number } | null => {
    if (inputRef.current) {
      const topPosition = inputRef.current.offsetTop + inputRef.current.offsetHeight
      const width = inputRef.current.offsetWidth

      return { topPosition, width }
    }
    return null
  }

  const autoCompPosition = autocompletePosition()
  if (autoCompPosition === null) return null
  return (
    <ul className='autocomplete-container' style={{ top: autoCompPosition.topPosition, width: autoCompPosition.width }}>
      {autocompleteOptions.map((json) => (
        <li key={json.id} className='autocomplete-element' onPointerDown={handlePointerDown}>{capitalizeStr(json.name)}</li>
      ))}
    </ul>
  )
}

export function InputFilter({ name, filter, disabled = false, onChange = null, pokemonSearcher = true }
  : { name: string, filter: string, disabled?: boolean, onChange?: ((event: React.ChangeEvent) => unknown) | null, pokemonSearcher: boolean }) {
  const url = `${POKEAPI_PREFIX}${filter}`
  const {
    inputRef,
    autocompleteOptions, showAutoComplete, hideValidationError,
    filterAutocomplete, autocompleteInputValue, checkFocusStatus, updateInput
  } = useInput({ url })
  const navigate = useNavigate()

  const handlePointerDown = (event: PointerEvent): void => {
    if (event.target && "textContent" in event.target && typeof event.target.textContent === 'string') {
      autocompleteInputValue(event.target.textContent)
      updateInput()
    }
  }

  const handleChange = (event: React.ChangeEvent): void => {
    if (onChange) {
      onChange(event)
    }
    updateInput()
    filterAutocomplete()
  }

  const handleFocus = (): void => {
    checkFocusStatus(true)
  }

  const handleBlur = (): void => {
    checkFocusStatus(false)
  }

  const searchFromSearchBar = (event: React.FormEvent): void => {
    event.preventDefault()
    // const form = event.target.closest('form')
    if (inputRef.current) {
      const inputInfo = inputRef.current.value
      return hideValidationError
        ? navigate(`/pokemon/${toKebabCase(inputInfo)}`)
        : navigate('/not-found')
    }


    // form.submit()
  }

  const inputFilter = (
    <div className={`input-container ${pokemonSearcher ? '' : 'search-name-form'}`}>
      {pokemonSearcher && <label htmlFor={`pokemon-${filter}`}>{`Pokémon ${name}:`}</label>}
      <input
        ref={inputRef} id={`pokemon-${name}`} name={name}
        placeholder={`Put a ${name}`} disabled={disabled}
        onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
        autoComplete='off'
      />
      {showAutoComplete &&
        <AutocompleteOptions inputRef={inputRef} autocompleteOptions={autocompleteOptions} handlePointerDown={handlePointerDown} />}
      {pokemonSearcher
        ? <p className='no-valid-campus' hidden={hideValidationError}>Please, insert a valid {name}.</p>
        : (
          <button type='submit' aria-label='search an article'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-search' viewBox='0 0 24 24'>
              <circle cx='11' cy='11' r='8' />
              <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
          </button>
        )}
    </div>
  )

  return pokemonSearcher
    ? inputFilter

    : (
      <form onSubmit={searchFromSearchBar} >
        {inputFilter}
      </form>
    )
}