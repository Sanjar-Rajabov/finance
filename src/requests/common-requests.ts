import {Request} from 'express'

interface GetByIdRequest extends Request {
  params: {
    id: string
  },
}


export {
  GetByIdRequest
}