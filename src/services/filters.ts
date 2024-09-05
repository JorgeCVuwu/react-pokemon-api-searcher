import { fetchData } from './fetch/fetch.ts'

import { pokeapiType } from './interfaces/pokeapi.ts'
import { pokeapiFiltersProps } from './interfaces/pokeapi/filters.ts'
import { filtersProps } from './interfaces/project/filters.ts'

export async function searchFilterResults(url: string): Promise<filtersProps | null> {
  const json: pokeapiType = await fetchData(url) as pokeapiFiltersProps

  if (json === null) return null

  return {
    results: json.results.map((result, index) => ({
      id: index + 1,
      name: result.name,
      url: result.url
    }))
  }
}
