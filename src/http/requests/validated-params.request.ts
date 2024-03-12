import e from "express";
import * as core from "express-serve-static-core";

export interface ValidatedParamsRequest<T extends core.ParamsDictionary> extends e.Request {
  params: T
}
