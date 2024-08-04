import { capitalizeStr } from '../utils/utils.js'

export function PokemonCard ({ pokemonJson }) {
  const typeSrcPrefix = './media/types/sword-shield/'

  const playAudio = (event) => {
    const audio = event.currentTarget.nextElementSibling
    audio.play()
  }

  return (
      <div id='pokemon-card' className='pokemon-card'>
        <p className='pokemon-name'>{capitalizeStr(pokemonJson.is_default ? pokemonJson.species.name : pokemonJson.name)}</p>
        <img className='pokemon-img' src={pokemonJson.front_sprite}/>
        <p className='pokemon-dex-number'>#{pokemonJson.dex_number}</p>

        <div className='pokemon-type-container'>
          {pokemonJson.types.map((type) => (
            <img key={type.order} className='pokemon-type-img' src={typeSrcPrefix + type.id + '.png'} />
          ))}
        </div>

        <div className='pokemon-audio-container'>
          <button className='pokemon-audio-button' onClick={playAudio}>
            <img className='audio-icon' src='./media/speaker_icon.svg' />
          </button>
          <audio src={pokemonJson.cry} />
        </div>
      </div>
  )
}

export function NotPokemonMessage () {
  return (
      <p className='no-pokemon-found'>No se pudo encontrar el Pokémon solicitado.</p>
  )
}
