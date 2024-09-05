interface moveDetailsProps {
    level_learned_at: number,
    move_learn_method: { name: string, url: string },
    version_group: { name: string, url: string }
}

interface pokemonTypeProps {
    type: { name: string, url: string }
    slot: number
}

interface pokemonAbilityProps {
    ability: { name: string, url: string },
    is_hidden: boolean
}

interface pokemonStatsProps {
    stat: { name: string, url: string }
    base_stat: number,
    effort: number
}

interface pokemonMoveProps {
    move: { name: string, url: string },
    version_group_details: moveDetailsProps[]
}

export interface pokemonProps {
    id: number,
    name: string,
    sprites: {
        front_default: string,
        other: { 'official-artwork': { front_default: string, front_shiny: string } }
    },
    cries: { latest: string },
    types: pokemonTypeProps[],
    is_default: boolean,
    species: { name: string, url: string },
    abilities: pokemonAbilityProps[],
    stats: pokemonStatsProps[],
    height: number,
    weight: number,
    moves: pokemonMoveProps[]
}