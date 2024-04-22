export function dataMapper(data: { [key: string]: any }, dto: any) {
  for (const key of Object.keys(dto)) {
    if (data.hasOwnProperty(key)) {
      dto[key] = data[key];
    }
  }

  return dto;
}
