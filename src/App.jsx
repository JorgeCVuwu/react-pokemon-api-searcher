import { useState } from 'react'

const PokemonCard = (pokemonJson) => {
  const typeSrcPrefix = '../../media/types/sword-shield/'

  return (
    <div id='pokemon-card' className='pokemon-card'>
      <p className='pokemon-name'>{pokemonJson.name}</p>
      <img className='pokemon-img' src={pokemonJson?.sprites?.front_default ?? ''}/>
      <p className='pokemon-dex-number'>#{pokemonJson.id}</p>

      <div className='pokemon-type-container'>
        {pokemonJson.types.map((type) => {
          <img className='pokemon-type-img' src={typeSrcPrefix + type.type.url.split('/').at(-2) + '.png'} />
        })}
      </div>

      <div className='pokemon-audio-container'>
        <button className='pokemon-audio-button'>
          <img className='audio-icon' src='../media/speaker_icon.svg' />
        </button>
        <audio src={pokemonJson.cries.latest} />
      </div>
    </div>
  )
}

const NotPokemonMessage = () => {
  return (
    <p className='no-pokemon-found'>No se pudo encontrar el Pokémon solicitado.</p>
  )
}

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

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    searchPokemon(event)
  }

  return { values, handleChange, handleSubmit }
}

const PokemonForm = () => {
  const { values, handleChange, handleSubmit } = usePokemonForm()

  return (
    <div className="pokemon-form-container">
      <form id="pokemon-search" name="pokemon-search" className="pokemon-form" onSubmit={handleSubmit}>
          <label htmlFor="pokemon-name">Pokémon name:</label>
          <input id="pokemon-name" name="name" placeholder="Ingresa un Pokémon"/>

          <label htmlFor="pokemon-type">Pokémon types:</label>
          <select id="pokemon-type-1" name="type" onChange={handleChange} ></select>
          <select id="pokemon-type-2" name="type"></select>

          <label htmlFor="pokemon-move">Pokémon move:</label>
          <input id="pokemon-move" name="move" placeholder="Put a move"/>

          <label htmlFor="pokemon-ability">Pokémon ability:</label>
          <input id="pokemon-ability" name="ability" placeholder="Put an ability"/>

          <label htmlFor="Pokémon generation:">Pokémon generation:</label>
          <select id="pokemon-generation" name="generation"></select>

          <div className="check-pokemon-forms-container">
              <label htmlFor="check-pokemon-forms">Include alternative Pokémon forms?</label>
              <input id="check-pokemon-forms" type="checkbox"/>
          </div>

          <button id="pokemon-submit" type="submit" onClick={searchPokemon}>Search</button>
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
