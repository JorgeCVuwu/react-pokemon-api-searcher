import { pokeapiPokemonProps } from "./pokeapi/pokemon.ts"
import { pokeapiPokemonSpeciesProps } from "./pokeapi/pokemon_species.ts"
import { pokeapiFiltersProps } from "./pokeapi/filters.ts"
import { pokeapiGenerationProps } from "./pokeapi/generation.ts"
import { pokeapiMoveProps } from "./pokeapi/move.ts"
import { pokeapiAbilityProps } from "./pokeapi/ability.ts"
import { pokeapiTypeProps } from "./pokeapi/type.ts"
import { pokeapiEvolutionChainProps } from "./pokeapi/evolution_chain.ts"

type pokeapiTypes = pokeapiPokemonProps | pokeapiPokemonSpeciesProps | pokeapiFiltersProps |
    pokeapiGenerationProps | pokeapiMoveProps | pokeapiAbilityProps | pokeapiTypeProps | pokeapiEvolutionChainProps

export type pokeapiType = pokeapiTypes