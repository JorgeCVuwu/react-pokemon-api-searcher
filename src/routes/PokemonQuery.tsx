import { IGNORED_TYPES } from '../constants/constants.js'
import { useBlockInputs } from '../hooks/useBlockInputs.js'
import { useSearchPokemon } from '../hooks/useSearchPokemon.js'
import { useValidator } from '../hooks/useValidator.js'

import { PokemonSearchProvider } from '../context/pokemonSearch.js'

import { PokemonSelectorFilter } from '../components/PokemonSelecterFilter.js'
import { PokemonCard, NotPokemonMessage, ChargingGif } from '../components/PokemonCard.js'
import { InputFilter } from '../components/InputFilter.js'

import { toKebabCase } from '../utils/utils.js'

function PokemonQueryComponent () {
  const { disabledInput, formRef, blockOtherInputs } = useBlockInputs('pokemon-name')
  const { foundedPokemon, loading, loadingStarted, changeInputs } = useSearchPokemon()
  const { submitRef } = useValidator()

  const handleChange = (event) => {
    if (event.target.id === 'pokemon-name') {
      blockOtherInputs(event)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const activeElement = document.activeElement
    if (activeElement) activeElement.blur()
    const fields = new window.FormData(event.target)
    const types = fields.getAll('type')

    // for filters with multiple fields you should use digits (ability1, ability2, ability3...)
    const queryFields = {
      name: toKebabCase(fields.get('name')),
      move: toKebabCase(fields.get('move')),
      type1: toKebabCase(types[0]),
      type2: toKebabCase(types[1]),
      ability: toKebabCase(fields.get('ability')),
      generation: toKebabCase(fields.get('generation')),
      include_pokemon_forms: fields.get('pokemon-form-checkbox')
    }

    changeInputs(queryFields) // change input state in useSearchPokemon executes the search with certain conditions

    // queryPokemon(queryFields)
  }

  return (
    <div className='pokemon-search-page-container'>
      <div className='pokemon-form-container'>
        <form ref={formRef} id='pokemon-search' name='pokemon-search' className='pokemon-form' onSubmit={handleSubmit}>

          <InputFilter name='name' filter='pokemon' onChange={handleChange} />

          <PokemonSelectorFilter id='pokemon-type-1' name='type-1' filter='type' ignoreResults={IGNORED_TYPES} disabled={disabledInput} />
          <PokemonSelectorFilter id='pokemon-type-2' name='type-2' filter='type' ignoreResults={IGNORED_TYPES} disabled={disabledInput} />

          <InputFilter name='move' filter='move' onChange={handleChange} disabled={disabledInput} />

          <InputFilter name='ability' filter='ability' onChange={handleChange} disabled={disabledInput} />

          <PokemonSelectorFilter id='pokemon-generation' name='generation' filter='generation' disabled={disabledInput} romanNumerals />

          <div className='check-pokemon-forms-container'>
            <label htmlFor='check-pokemon-forms'>Include alternative Pokémon forms?</label>
            <input id='check-pokemon-forms' type='checkbox' name='pokemon-form-checkbox' disabled={disabledInput} />
          </div>

          <button ref={submitRef} id='pokemon-submit' type='submit' disabled={loading}>Search</button>
        </form>
      </div>
      {loadingStarted && (
        <div className='response-container'>
          {loading
            ? <ChargingGif />
            : foundedPokemon.length > 0
              ? (
                <div className='pokemon-response-container'>
                  {(foundedPokemon.map(pokemon => (
                    <PokemonCard key={pokemon.dex_number} pokemonJson={pokemon} />
                  )))}
                </div>
                )
              : (<NotPokemonMessage />)}
        </div>
      )}
    </div>

  )
}

export function PokemonQuery () {
  return (
    <PokemonSearchProvider>
      <PokemonQueryComponent />
    </PokemonSearchProvider>
  )
}
