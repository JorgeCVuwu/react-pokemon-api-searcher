interface abilityDetailsProps {
    is_hidden: boolean,
    pokemon: { name: string, url: string }
}

export interface pokeapiAbilityProps {
    pokemon: abilityDetailsProps[]
}