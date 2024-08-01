import { useState, useEffect, useRef } from 'react'
import { PokemonSelectorFilter } from './components/PokemonSelecterFilter.jsx'
import { IGNORED_TYPES } from './constants/constants.js'
import { ResponseContainer } from './components/ResponseContainer.jsx'
import { useBlockInputs } from './hooks/useBlockInputs.js'

const ChargingGif = () => {
  return (
    <img className='charging-gif' src='./media/gifs/charging.gif' />
  )
}

const ExpandButton = () => {
  return (
    <button id='expand-pokemon-search' className='expand-search-button'>Expand search</button>
  )
}

async function searchPokemon (event) {

}

function PokemonForm () {
  // const { pokemon, loading, getPokemon } = usePokemon()

  const { disabledInput, blockOtherInputs, formRef } = useBlockInputs()

  const handleSubmit = (event) => {
    const [loadingSearch, setLoadingSearch] = useState(true)
    event.preventDefault()
    const fields = new window.FormData(event.target)
    const pokemonName = fields.get('name')
  }

  return (
    <div className="pokemon-form-container">
      <form ref={formRef} id="pokemon-search" name="pokemon-search" className="pokemon-form" onSubmit={handleSubmit}>
          <label htmlFor="pokemon-name">Pokémon name:</label>
          <input id="pokemon-name" name="name" onInput={blockOtherInputs} placeholder="Ingresa un Pokémon"/>

          <label htmlFor="pokemon-type">Pokémon types:</label>
          <PokemonSelectorFilter id="pokemon-type-1" filter="type" ignoreResults={IGNORED_TYPES} disabled={disabledInput}/>
          <PokemonSelectorFilter id="pokemon-type-2" filter="type" ignoreResults={IGNORED_TYPES} disabled={disabledInput}/>

          <label htmlFor="pokemon-move">Pokémon move:</label>
          <input id="pokemon-move" name="move" placeholder="Put a move" disabled={disabledInput}/>

          <label htmlFor="pokemon-ability">Pokémon ability:</label>
          <input id="pokemon-ability" name="ability" placeholder="Put an ability" disabled={disabledInput}/>

          <label htmlFor="Pokémon generation">Pokémon generation:</label>
          <PokemonSelectorFilter id="pokemon-generation" filter="generation" disabled={disabledInput}/>

          <div className="check-pokemon-forms-container">
              <label htmlFor="check-pokemon-forms">Include alternative Pokémon forms?</label>
              <input id="check-pokemon-forms" type="checkbox" name="checkbox" disabled={disabledInput}/>
          </div>

          <button id="pokemon-submit" type="submit">Search</button>
      </form>
    </div>
  )
}

function App () {
  return (
    <>
      <PokemonForm/>
       <ResponseContainer/>
    </>
  )
}

export default App
