import {Request} from "express";

interface WalletCreateRequest extends Request {
  body: {
    name: string,
    balance: number
  }
}

interface WalletUpdateRequest extends Request {
  params: {
    id: string
  },
  body: {
    name: string,
    balance: number
  }
}

export {
  WalletCreateRequest,
  WalletUpdateRequest
}