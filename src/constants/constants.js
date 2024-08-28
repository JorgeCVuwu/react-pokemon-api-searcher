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

export const TYPE_COLOR_FUNCTIONS = {
  primary: 0,
  secondary: 15,
  terciary: 20,
  national_dex: -10
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
  red: { color: '#DA3914' },
  blue: { color: '#0072BB' },
  yellow: { color: '#FFCC00' },
  gold: { color: '#CF9B00' },
  silver: { color: '#C0C0C0' },
  crystal: { color: '#4DB1E8' },
  ruby: { color: '#C42A12' },
  sapphire: { color: '#0A44A4' },
  emerald: { color: '#009A44' },
  firered: { color: '#FF6E6E' },
  leafgreen: { color: '#78C850' },
  diamond: { color: '#B9C2C6' },
  pearl: { color: '#E1A3A3' },
  platinum: { color: '#A7A6A9' },
  heartgold: { color: '#D4A017' },
  soulsilver: { color: '#C0C0C0' },
  black: { color: '#313131' },
  white: { color: '#FFFFFF', fontColor: '#000000' },
  'black-2': { color: '#3D3D3D' },
  'white-2': { color: '#F5F5F5', fontColor: '#000000' },
  x: { color: '#6376B1' },
  y: { color: '#DA4453' },
  'omega-ruby': { color: '#C42A12' },
  'alpha-sapphire': { color: '#0A44A4' },
  sun: { color: '#FFA500' },
  moon: { color: '#8A84EB' },
  'ultra-sun': { color: '#FF4500' },
  'ultra-moon': { color: '#7B68EE' },
  sword: { color: '#5A8FCB' },
  shield: { color: '#D93F47' },
  'brilliant-diamond': { color: '#B9C2C6' },
  'shining-pearl': { color: '#E1A3A3' },
  'legends-arceus': { color: '#7B9B9B' },
  scarlet: { color: '#EF454A' },
  violet: { color: '#9457EB' },
  'lets-go-pikachu': { color: '#FFDC5E' },
  'lets-go-eevee': { color: '#A67C52' }
}
