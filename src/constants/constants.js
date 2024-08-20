export const POKEAPI_PREFIX = 'https://pokeapi.co/api/v2/'
export const IGNORED_TYPES = ['stellar', 'shadow', 'unknown']

export const POKEMON_LIST_KEY_IN_PROPERTY = { type: 'pokemon', ability: 'pokemon', move: 'learned_by_pokemon', generation: 'pokemon_species' }
export const POKEMON_KEY_IN_PROPERTY = { type: 'pokemon', ability: 'pokemon' }

export const POKEMON_TYPE_COLORS = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD'
}

export const POKEMON_STATS_ABREVIATIONS = {
  hp: 'HP',
  attack: 'Atk',
  defense: 'Def',
  'special-attack': 'Sp.Atk',
  'special-defense': 'Sp.Def',
  speed: 'Speed'
}

export const STAT_COLORS = {
  hp: '#6390F0',
  attack: '#EE8130',
  defense: '#B7B7CE',
  'special-attack': '#F95587',
  'special-defense': '#96D9D6',
  speed: '#7AC74C'
}

export const POKEMON_FORMS_ACCEPTED = ['-alola', '-galar', '-hisui', '-mega', '-mega-x', 'mega-y']

export const POKEMON_REGIONAL_FORMS =
  [{ region: 'alola', suffix: '-alola', generation: 'generation-vii' },
    { region: 'galar', suffix: '-galar', generation: 'generation-viii' },
    { region: 'hisui', suffix: '-hisui', generation: 'generation-viii' }]

export const NOT_CONSIDERED_FORMS = ['-totem']
