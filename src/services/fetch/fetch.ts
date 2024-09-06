import { pokeapiType } from "../interfaces/pokeapi.ts"

export async function fetchData(url: string): Promise<(pokeapiType | null)> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status} ${url}`)
    }
    const pokemonJson = await response.json()
    return pokemonJson
  } catch (error) {
    console.error('Fetch error: ', error, 'searching', url)
    return null
  }
}
