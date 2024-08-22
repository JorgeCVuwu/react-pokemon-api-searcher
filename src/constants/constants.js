import { lightenColor } from '../utils/utils.js'

export const POKEAPI_PREFIX = 'https://pokeapi.co/api/v2/'
export const IGNORED_TYPES = ['stellar', 'shadow', 'unknown']

export const POKEMON_LIST_KEY_IN_PROPERTY = { type: 'pokemon', ability: 'pokemon', move: 'learned_by_pokemon', generation: 'pokemon_species' }
export const POKEMON_KEY_IN_PROPERTY = { type: 'pokemon', ability: 'pokemon' }

export const POKEMON_TYPE_COLORS = {
  normal: { primary: '#A8A77A', secondary: lightenColor('#A8A77A', 20) },
  fire: { primary: '#EE8130', secondary: lightenColor('#EE8130', 20) },
  water: { primary: '#6390F0', secondary: lightenColor('#6390F0', 20) },
  electric: { primary: '#F7D02C', secondary: lightenColor('#F7D02C', 20) },
  grass: { primary: '#7AC74C', secondary: lightenColor('#7AC74C', 20) },
  ice: { primary: '#96D9D6', secondary: lightenColor('#96D9D6', 20) },
  fighting: { primary: '#C22E28', secondary: lightenColor('#C22E28', 20) },
  poison: { primary: '#A33EA1', secondary: lightenColor('#A33EA1', 20) },
  ground: { primary: '#E2BF65', secondary: lightenColor('#E2BF65', 20) },
  flying: { primary: '#A98FF3', secondary: lightenColor('#A98FF3', 20) },
  psychic: { primary: '#F95587', secondary: lightenColor('#F95587', 20) },
  bug: { primary: '#A6B91A', secondary: lightenColor('#A6B91A', 20) },
  rock: { primary: '#B6A136', secondary: lightenColor('#B6A136', 20) },
  ghost: { primary: '#735797', secondary: lightenColor('#735797', 20) },
  dragon: { primary: '#6F35FC', secondary: lightenColor('#6F35FC', 20) },
  dark: { primary: '#705746', secondary: lightenColor('#705746', 20) },
  steel: { primary: '#B7B7CE', secondary: lightenColor('#B7B7CE', 20) },
  fairy: { primary: '#D685AD', secondary: lightenColor('#D685AD', 20) }
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
