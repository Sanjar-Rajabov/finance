export function formatDate(date: Date, format: string = 'Y-m-d H:i:s'): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format.replace('Y', `${year}`)
    .replace('m', month)
    .replace('d', day)
    .replace('H', hours)
    .replace('i', minutes)
    .replace('s', seconds);
}
