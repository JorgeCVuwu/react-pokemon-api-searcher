export const POKEAPI_PREFIX = 'https://pokeapi.co/api/v2/'
export const IGNORED_TYPES = ['stellar', 'shadow', 'unknown']

export type pokemonPropertyTypes = 'type' | 'ability' | 'move' | 'generation'
export type pokemonFilterProperties = 'pokemon' | 'learned_by_pokemon' | 'pokemon_species'
export const POKEMON_LIST_KEY_IN_PROPERTY: Record<pokemonPropertyTypes, pokemonFilterProperties> = { type: 'pokemon', ability: 'pokemon', move: 'learned_by_pokemon', generation: 'pokemon_species' }
export const POKEMON_KEY_IN_PROPERTY: Record<pokemonPropertyTypes, pokemonFilterProperties | null> = { type: 'pokemon', ability: 'pokemon', move: null, generation: null }

export type POKEMON_TYPES_TYPE = 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' | 'fighting' | 'poison' | 'ground' |
  'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy'
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

export const POKEMON_FORMS_ACCEPTED = ['-alola', '-galar', '-galar-standard', '-hisui', '-mega', '-mega-x', 'mega-y']

export const POKEMON_REGIONAL_FORMS =
  [{ region: 'alola', suffix: '-alola', generation: 'generation-vii' },
  { region: 'galar', suffix: '-galar', generation: 'generation-viii' },
  { region: 'hisui', suffix: '-hisui', generation: 'generation-viii' }]

export const NOT_CONSIDERED_FORMS = ['-totem']

export const GAMES_DATA = {
  red: { color: '#DA3914', generation: 'generation-i' },
  blue: { color: '#0072BB', generation: 'generation-i' },
  yellow: { color: '#FFCC00', generation: 'generation-i' },
  gold: { color: '#CF9B00', generation: 'generation-ii' },
  silver: { color: '#C0C0C0', generation: 'generation-ii' },
  crystal: { color: '#4DB1E8', generation: 'generation-ii' },
  ruby: { color: '#C42A12', generation: 'generation-iii' },
  sapphire: { color: '#0A44A4', generation: 'generation-iii' },
  emerald: { color: '#009A44', generation: 'generation-iii' },
  firered: { color: '#FF6E6E', generation: 'generation-iii' },
  leafgreen: { color: '#78C850', generation: 'generation-iii' },
  diamond: { color: '#B9C2C6', generation: 'generation-iv' },
  pearl: { color: '#E1A3A3', generation: 'generation-iv' },
  platinum: { color: '#A7A6A9', generation: 'generation-iv' },
  heartgold: { color: '#D4A017', generation: 'generation-iv' },
  soulsilver: { color: '#C0C0C0', generation: 'generation-iv' },
  black: { color: '#313131', generation: 'generation-v' },
  white: { color: '#FFFFFF', fontColor: '#000000', generation: 'generation-v' },
  'black-2': { color: '#3D3D3D', generation: 'generation-v' },
  'white-2': { color: '#F5F5F5', fontColor: '#000000', generation: 'generation-v' },
  x: { color: '#6376B1', generation: 'generation-vi' },
  y: { color: '#DA4453', generation: 'generation-vi' },
  'omega-ruby': { color: '#C42A12', generation: 'generation-vi' },
  'alpha-sapphire': { color: '#0A44A4', generation: 'generation-vi' },
  sun: { color: '#FFA500', generation: 'generation-vii' },
  moon: { color: '#8A84EB', generation: 'generation-vii' },
  'ultra-sun': { color: '#FF4500', generation: 'generation-vii' },
  'ultra-moon': { color: '#7B68EE', generation: 'generation-vii' },
  'lets-go-pikachu': { color: '#FFDC5E', generation: 'generation-vii', alternative_gen: true },
  'lets-go-eevee': { color: '#A67C52', generation: 'generation-vii', alternative_gen: true },
  sword: { color: '#5A8FCB', generation: 'generation-viii' },
  shield: { color: '#D93F47', generation: 'generation-viii' },
  'brilliant-diamond': { color: '#B9C2C6', generation: 'generation-viii', alternative_gen: true },
  'shining-pearl': { color: '#E1A3A3', generation: 'generation-viii', alternative_gen: true },
  'legends-arceus': { color: '#7B9B9B', generation: 'generation-viii' },
  scarlet: { color: '#EF454A', generation: 'generation-ix' },
  violet: { color: '#9457EB', generation: 'generation-ix' }
}
