interface evolutionDetailsProps {
    gender: string | null,
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
    relative_physical_stats: number | null,
    time_of_day: string,
    trade_species: { name: string, url: string } | null,
    trigger: { name: string, url: string },
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