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

export function toKebabCase (str) {
  if (!str) return str
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
}

export function capitalizeStr (str, keepDash = false, romanNumerals = false) {
  if (!str) return str
  const res = str.replace(/\b\w/g, char => char.toUpperCase())
  const res2 = keepDash
    ? res
    : res.replace(/-/g, ' ')
  return romanNumerals
    ? res2.replace(/\b(M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}))\b/gi, match => match.toUpperCase())
    : res2
}

export function deleteDashes (str) {
  if (!str) return str
  return str.replace(/-/g, ' ')
}

export function capitalizeRomanNumerals (str) {
  const romanNumeralRegex = /\b(M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}))\b/gi

  return str.replace(romanNumeralRegex, match => match.toUpperCase())
}

export function compareArraysEqual (arr1, arr2) {
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)

  if (set1.size !== set2.size) return false

  for (const value of set1) {
    if (!set2.has(value)) return false
  }

  return true
}
