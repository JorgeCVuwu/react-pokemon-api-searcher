interface speciesTextEntriesProps {
    pokemon: { name: string, url: string },
    is_default: boolean
}

interface speciesTextEntriesProps {
    flavor_text: string,
    language: { name: string, url: string },
    version: { name: string, url: string }
}

export interface pokeapiPokemonSpeciesProps {
    id: number,
    name: string,
    varieties: speciesTextEntriesProps[],
    generation: { name: string, url: string },
    evolution_chain: { url: string },
    is_legendary: boolean,
    is_mythical: boolean,
    flavor_text_entries: speciesTextEntriesProps[]
}