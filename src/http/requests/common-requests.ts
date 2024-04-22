import e, {Request} from 'express'
import * as core from "express-serve-static-core";

interface GetByIdRequest extends Request {
  params: {
    id: string
  },
}

export interface PaginationRequest extends core.Query {
  limit: string,
  page: string
}

export interface GetOneRequest extends core.ParamsDictionary {
  id: string
}

export interface ValidatedBodyRequest<T> extends e.Request {
  body: T
}

export interface ValidatedParamsRequest<T extends core.ParamsDictionary> extends e.Request {
  params: T
}

export interface ValidatedQueryRequest<T extends core.Query> extends e.Request {
  query: T
}

export {
  GetByIdRequest
}