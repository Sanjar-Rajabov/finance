export function ucfirst(string: string) {
  return string[0].toUpperCase() + string.substring(1)
}

export function splitCamelCase(string: string) {
  return string.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function generateRandomString(length: number) {
  let chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  return [...Array(length)].reduce(a => a + chars[~~(Math.random() * chars.length)], '')
}
