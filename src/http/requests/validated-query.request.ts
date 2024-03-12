import e from "express";
import * as core from "express-serve-static-core";

export interface ValidatedQueryRequest<T extends core.Query> extends e.Request {
  query: T
}
