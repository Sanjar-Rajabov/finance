import e from "express";
import {setAppLocale} from "../../config/locale";
import {getLocale} from "../../helpers/locale";

export function localeMiddleware(req: e.Request, res: e.Response, next: e.NextFunction) {
  setAppLocale(getLocale(req))

  next()
}