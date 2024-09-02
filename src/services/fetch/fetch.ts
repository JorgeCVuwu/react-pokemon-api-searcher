export async function fetchData (url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status} ${url}`)
    }
    const pokemonJson = await response.json() // bug con malamar al buscar por id (687), json invalido
    return pokemonJson
  } catch (error) {
    console.error('Fetch error: ', error, 'searching', url)
    return false
  }
}
