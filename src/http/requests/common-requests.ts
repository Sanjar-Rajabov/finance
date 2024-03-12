import {Request} from 'express'
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

export {
  GetByIdRequest
}