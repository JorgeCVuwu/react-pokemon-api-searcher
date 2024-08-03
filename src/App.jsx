import { IGNORED_TYPES } from './constants/constants.js'
import { useBlockInputs } from './hooks/useBlockInputs.js'
import { useSearchPokemon } from './hooks/useSearchPokemon.js'

import { PokemonSelectorFilter } from './components/PokemonSelecterFilter.jsx'
import { PokemonCard } from './components/PokemonCard.jsx'
import { InputFilter } from './components/InputFilter.jsx'

// const ChargingGif = () => {
//   return (
//     <img className='charging-gif' src='./media/gifs/charging.gif' />
//   )
// }

// const ExpandButton = () => {
//   return (
//     <button id='expand-pokemon-search' className='expand-search-button'>Expand search</button>
//   )
// }

function PokemonQuery () {
  const { disabledInput, formRef, blockOtherInputs } = useBlockInputs('pokemon-name')
  const { foundedPokemon, loadingStarted, queryPokemon } = useSearchPokemon()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const fields = new window.FormData(event.target)
    const types = fields.getAll('type')

    // for filters with multiple fields you should use digits (ability1, ability2, ability3...)
    const queryFields = {
      name: fields.get('name'),
      move: fields.get('move'),
      // type: fields.getAll('type').filter(type => type !== ''),
      type1: types[0],
      type2: types[1],
      ability: fields.get('ability'),
      generation: fields.get('generation'),
      include_pokemon_forms: fields.get('pokemon-form-checkbox')
    }

    queryPokemon(queryFields)
  }

  return (
    <main>
      <div className="pokemon-form-container">
        <form ref={formRef} id="pokemon-search" name="pokemon-search" className="pokemon-form" onSubmit={handleSubmit}>
            <InputFilter name="name" filter="pokemon" onChange={blockOtherInputs}/>

            <label htmlFor="pokemon-type-1">Pokémon types:</label>
            <PokemonSelectorFilter id="pokemon-type-1" filter="type" ignoreResults={IGNORED_TYPES} disabled={disabledInput}/>
            <PokemonSelectorFilter id="pokemon-type-2" filter="type" ignoreResults={IGNORED_TYPES} disabled={disabledInput}/>

            <InputFilter name="move" filter="move" disabled={disabledInput}/>

            <InputFilter name="ability" filter="ability" disabled={disabledInput}/>

            <label htmlFor="pokemon-generation">Pokémon generation:</label>
            <PokemonSelectorFilter id="pokemon-generation" filter="generation" disabled={disabledInput}/>

            <div className="check-pokemon-forms-container">
                <label htmlFor="check-pokemon-forms">Include alternative Pokémon forms?</label>
                <input id="check-pokemon-forms" type="checkbox" name="pokemon-form-checkbox" disabled={disabledInput}/>
            </div>

            <button id="pokemon-submit" type="submit">Search</button>
        </form>
      </div>
      {loadingStarted && (
        <div className='response-container'>
          {foundedPokemon.length > 0
            ? <div className='pokemon-response-container'>
                {(foundedPokemon.map(pokemon => (
                  <PokemonCard key={pokemon.dex_number} pokemonJson={pokemon} />
                )))}
              </div>
            : (<>XD</>)
          }
        </div>
      )}
    </main>
  )
}

function App () {
  return (
    <>
      <PokemonQuery/>
    </>
  )
}

export default App
