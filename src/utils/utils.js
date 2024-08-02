export function getCommonElements (lists) {
  if (lists.length === 0 || lists.find(arr => arr.length === 0)) return []
  return lists[0].filter(url =>
    lists.every(list => list.includes(url))
  )
}

export function sortPokemonUrlsById (list) {
  return list.sort((url1, url2) => url1.split('/').at(-2) - url2.split('/').at(-2))
}

export function getSortedCommonElements (arr) {
  return sortPokemonUrlsById(getCommonElements(arr))
}

export function pushFilteringSpecialForms (urls) {
  return urls.filter(url => {
    const urlId = url.split('/').at(-2)
    // PokemonAPI convention: id > 10000 => pokemon special form
    return urlId < 10000
  })
}

export function removeDigits (str) {
  return str.replace(/\d+/g, '')
}