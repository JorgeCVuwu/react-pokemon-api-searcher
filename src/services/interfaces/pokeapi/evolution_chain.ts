import { pokemonProps } from "../project/pokemon"

export interface evolutionDetailsProps {
    gender: 1 | 2 | null,
    held_item: { name: string, url: string } | null,
    item: { name: string, url: string } | null,
    known_move: { name: string, url: string } | null,
    known_move_type: { name: string, url: string } | null,
    location: { name: string, url: string } | null,
    min_affection: number | null,
    min_beauty: number | null,
    min_happiness: number | null,
    min_level: number | null,
    needs_overworld_rain: boolean,
    party_species: { name: string, url: string } | null,
    party_type: { name: string, url: string } | null,
    relative_physical_stats: 0 | 1 | -1 | null,
    time_of_day: string,
    trade_species: { name: string, url: string } | null,
    trigger: { name: 'level-up' | 'trade' | 'use-item', url: string },
    turn_upside_down: boolean
}

export interface jsonChainProps {
    evolution_details: evolutionDetailsProps[],
    evolves_to: jsonChainProps[],
    species: { name: string, url: string }
}

export interface pokeapiEvolutionChainProps {
    id: number,
    chain: jsonChainProps
}

export interface FormDataProps {
    form_data: pokemonProps,
    evolution_details: evolutionDetailsProps,
    evolves_to: (FormDataProps | null)[]
}