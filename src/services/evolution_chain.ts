import { fetchData } from './fetch/fetch.ts'

// import { pokeapiType } from './interfaces/pokeapi.ts'
import { pokeapiEvolutionChainProps, jsonChainProps } from './interfaces/pokeapi/evolution_chain.ts'

export async function searchEvolutionChain(url: string): Promise<pokeapiEvolutionChainProps> {
  const chainJson: pokeapiEvolutionChainProps = await fetchData(url) as pokeapiEvolutionChainProps

  const chainEvolutions: { id: number; chain: jsonChainProps } = {
    id: chainJson.id, chain: { evolution_details: [], evolves_to: [], species: { name: '', url: '' } }
  }
  const chain = chainEvolutions.chain

  const recursiveWriting = (chainJson: jsonChainProps, chain: jsonChainProps) => {

    chain.species = { ...chainJson.species }

    chain.evolution_details = chainJson.evolution_details.map(evolInfo => ({
      ...evolInfo,
      trigger: { ...evolInfo.trigger }
    }))

    const evolvesToJson = chainJson.evolves_to
    const n = evolvesToJson.length

    chain.evolves_to = Array.from({ length: n }, () => ({ evolution_details: [], evolves_to: [], species: { name: '', url: '' } }))
    for (let i = 0; i < n; i++) {
      recursiveWriting(evolvesToJson[i], chain.evolves_to[i])
    }

    return chainEvolutions
  }

  return recursiveWriting(chainJson.chain, chain)
}
