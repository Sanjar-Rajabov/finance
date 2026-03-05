import {mapType} from "./type";

export function iterateBody(body: any): any {
  if (!body || typeof body !== 'object') {
    return {};
  }

  let properties: any = {};

  for (let key in body) {
    if (typeof body[key] === 'object' && body[key] !== null && !Array.isArray(body[key])) {
      properties[key] = {
        type: "object",
        properties: iterateBody(body[key])
      };
    } else if (Array.isArray(body[key])) {
      properties[key] = {
        type: "array",
        example: body[key]
      };
    } else {
      properties[key] = {
        type: mapType(typeof body[key]),
        example: body[key]
      };
    }
  }

  return properties;
}