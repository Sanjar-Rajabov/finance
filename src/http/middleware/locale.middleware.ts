import e from "express";
import {getLocale, setAppLocale} from "../../utils/locale";

export function localeMiddleware(req: e.Request, res: e.Response, next: e.NextFunction) {
  setAppLocale(getLocale(req))

  next()
}