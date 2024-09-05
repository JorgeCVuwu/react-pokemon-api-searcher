import { pokemonProps } from "./pokeapi/pokemon.ts"
import { pokemonSpeciesProps } from "./pokeapi/pokemon_species.ts"

export type pokeapiType = (pokemonProps & pokemonSpeciesProps) | null