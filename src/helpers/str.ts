export function ucfirst(string: string) {
  return string[0].toUpperCase() + string.substring(1)
}

export function splitCamelCase(string: string) {
  return string.replace(/([a-z])([A-Z])/g, '$1 $2');
}