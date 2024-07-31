export function PokemonCard (pokemonJson) {
  const typeSrcPrefix = '../../media/types/sword-shield/'

  return (
      <div id='pokemon-card' className='pokemon-card'>
        <p className='pokemon-name'>{pokemonJson.name}</p>
        <img className='pokemon-img' src={pokemonJson?.sprites?.front_default ?? ''}/>
        <p className='pokemon-dex-number'>#{pokemonJson.id}</p>

        <div className='pokemon-type-container'>
          {pokemonJson.types.map((type) => (
            <img key={type.slot} className='pokemon-type-img' src={typeSrcPrefix + type.type.url.split('/').at(-2) + '.png'} />
          ))}
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
