export const debounce = (func, wait = 500) => {
  let timeout
  return (...args) => {
    const later = () => {
      timeout = null
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const removeExtraSpaces = (search) => {
  return search.replace(/\s\s+/g, ' ').trim()
}

export const toLowerCase = (keywords) => {
  return keywords.map((keyword) => keyword.toString().toLowerCase())
}
