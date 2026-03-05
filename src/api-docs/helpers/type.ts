export function mapType(jsType: string): string {
  switch (jsType) {
    case 'number':
      return 'number';
    case 'string':
      return 'string';
    case 'boolean':
      return 'boolean';
    default:
      return 'string';
  }
}
