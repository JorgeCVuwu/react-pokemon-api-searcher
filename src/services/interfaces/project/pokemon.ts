interface pokemonTypeProps {
    id: number | undefined,
    name: string,
    url: string,
    order: number
}

interface pokemonAbilityProps {
    name: string,
    url: string,
    is_hidden: boolean
}

interface pokemonStatsProps {
    name: string,
    base_stat: number,
    effort: number,
    url: string
}

interface pokemonMoveProps {
    name: string,
    url: string,
    version_group_details: moveDetailsProps[]
}

interface moveDetailsProps {
    level_learned_at: number,
    move_learn_method: { name: string, url: string },
    version_group: { name: string, url: string }
}

export interface pokemonProps {
    id: number,
    name: string,
    front_sprite: string,
    sprites: { front_sprite: string, front_default: string, front_default_shiny: string }
    dex_number: number,
    cry: string,
    types: pokemonTypeProps[],
    is_default: boolean,
    species: { name: string, url: string },
    abilities: pokemonAbilityProps[],
    stats: pokemonStatsProps[],
    height: number,
    weight: number,
    moves: pokemonMoveProps[],
}