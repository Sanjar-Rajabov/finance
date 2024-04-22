export function chunkArray(array: any[], chunkSize: number): any[][] {
  const chunkedArray: any[][] = [];
  let index = 0;

  while (index < array.length) {
    chunkedArray.push(array.slice(index, index + chunkSize));
    index += chunkSize;
  }

  return chunkedArray;
}