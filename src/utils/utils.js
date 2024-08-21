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
  if (arr1.length !== arr2.length) return false

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }

  return true
}

export function compareArraysSameElements (arr1, arr2) {
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)

  if (set1.size !== set2.size) return false

  for (const value of set1) {
    if (!set2.has(value)) return false
  }

  return true
}

// función copiada de ChatGPT XD
export function lightenColor (hex, percent) {
  const num = parseInt(hex.slice(1), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt

  return `#${(
    0x1000000 +
    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)
  ).toString(16).slice(1).toUpperCase()}`
}
