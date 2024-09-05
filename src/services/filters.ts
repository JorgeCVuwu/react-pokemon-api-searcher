import { fetchData } from './fetch/fetch.ts'

export async function searchFilterResults (url) {
  const json = await fetchData(url)

  return {
    results: json.results.map((result, index) => ({
      id: index + 1,
      name: result.name,
      url: result.url
    }))
  }
}
