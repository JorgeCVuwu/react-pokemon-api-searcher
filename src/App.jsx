import { useState } from 'react'

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

function usePokemonForm () {
  const [values, setValues] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    searchPokemon(event)
  }

  return { values, handleSubmit }
}

const PokemonForm = () => {
  const { values, handleSubmit } = usePokemonForm()

  return (
    <div className="pokemon-form-container">
      <form id="pokemon-search" name="pokemon-search" className="pokemon-form" onSubmit={handleSubmit}>
          <label htmlFor="pokemon-name">Pokémon name:</label>
          <input id="pokemon-name" name="name" placeholder="Ingresa un Pokémon"/>

          <label htmlFor="pokemon-type">Pokémon types:</label>
          <select id="pokemon-type-1" name="type1"></select>
          <select id="pokemon-type-2" name="type2"></select>

          <label htmlFor="pokemon-move">Pokémon move:</label>
          <input id="pokemon-move" name="move" placeholder="Put a move"/>

          <label htmlFor="pokemon-ability">Pokémon ability:</label>
          <input id="pokemon-ability" name="ability" placeholder="Put an ability"/>

          <label htmlFor="Pokémon generation:">Pokémon generation:</label>
          <select id="pokemon-generation" name="generation"></select>

          <div className="check-pokemon-forms-container">
              <label htmlFor="check-pokemon-forms">Include alternative Pokémon forms?</label>
              <input id="check-pokemon-forms" type="checkbox" name="checkbox"/>
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
      <div id="response-container" className="response-container">
      </div>
    </>
  )
}

export default App
