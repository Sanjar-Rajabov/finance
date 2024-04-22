import e from "express";
import {Locale} from "../structures/locale";

export function getLocale(req: e.Request): Locale {
  if (
    req.headers["accept-language"] &&
    req.headers["accept-language"] === 'ru' ||
    req.headers["accept-language"] === 'uz' ||
    req.headers["accept-language"] === 'en'
  ) {
    return req.headers["accept-language"]
  }

  return 'ru'
}
