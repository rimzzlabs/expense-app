type ObjectValue = Record<string, string>

/**
 * It takes a string like `#foo=bar&baz=qux` and returns an object like `{ foo: 'bar', baz: 'qux' }`
 * @param {string} hash - string
 * @returns An object with the key value pairs from the hash.
 */
export const parseHashQuery = (hash: string) => {
  const obj = {} as ObjectValue
  hash
    .split('&')
    .map((s) => s.replace('#', '').split('='))
    .forEach((items) => (obj[items[0]] = items[1]))

  return obj
}
