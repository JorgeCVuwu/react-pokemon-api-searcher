import { fetchData } from './fetch/fetch.js'

export async function searchEvolutionChain (url) {
  const chainJson = await fetchData(url)

  const chainEvolutions = { id: chainJson.id, chain: {} }
  const chain = chainEvolutions.chain

  const recurseReading = (chainJson, chain) => {
    chain.species = { name: chainJson.species.name, url: chainJson.species.url }

    chain.evolution_details = chainJson.evolution_details.map(evolInfo => ({
      gender: evolInfo.gender,
      held_item: evolInfo.held_item,
      item: evolInfo.item,
      known_move: evolInfo.known_move,
      known_move_type: evolInfo.known_move_type,
      location: evolInfo.location,
      min_affection: evolInfo.min_affection,
      min_beauty: evolInfo.min_beauty,
      min_happiness: evolInfo.min_happiness,
      min_level: evolInfo.min_level,
      needs_overworld_rain: evolInfo.needs_overworld_rain,
      party_species: evolInfo.party_species,
      party_type: evolInfo.party_type,
      relative_physical_stats: evolInfo.relative_physical_stats,
      time_of_day: evolInfo.time_of_day,
      trade_species: evolInfo.trade_species,
      trigger: { name: evolInfo.trigger.name, url: evolInfo.trigger.url },
      turn_upside_down: evolInfo.turn_upside_down
    }))

    const evolvesToJson = chainJson.evolves_to
    const n = evolvesToJson.length

    chain.evolves_to = Array(n).fill({})
    for (let i = 0; i < n; i++) {
      recurseReading(evolvesToJson[i], chain.evolves_to[i])
    }

    return chainEvolutions
  }

  return recurseReading(chainJson.chain, chain)
}
