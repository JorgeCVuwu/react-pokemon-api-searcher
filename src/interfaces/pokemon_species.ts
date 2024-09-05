interface speciesVarietiesProps {
    name: string,
    url: string,
    is_default: boolean
}

interface speciesTextEntriesProps {
    flavor_text: string,
    language: { name: string, url: string },
    version: { name: string, url: string }
}

export interface pokemonSpeciesProps {
    id: number,
    name: string,
    varieties: speciesVarietiesProps[],
    generation: { name: string, url: string },
    evolution_chain: { url: string },
    is_legendary: boolean,
    is_mythical: boolean,
    flavor_text_entries: speciesTextEntriesProps[]
}

interface speciesJsonTextEntriesProps {
    pokemon: { name: string, url: string },
    is_default: boolean
}

interface speciesJsonTextEntriesProps {
    flavor_text: string,
    language: { name: string, url: string },
    version: { name: string, url: string }
}

export interface pokemonJsonSpeciesProps {
    id: number,
    name: string,
    varieties: speciesJsonTextEntriesProps[],
    generation: { name: string, url: string },
    evolution_chain: { url: string },
    is_legendary: boolean,
    is_mythical: boolean,
    flavor_text_entries: speciesJsonTextEntriesProps[]
}