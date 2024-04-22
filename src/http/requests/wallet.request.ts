interface WalletCreateRequest {
  name: string,
  balance: number
}

interface WalletUpdateRequest {
  name: string,
  balance: number
}

export {
  WalletCreateRequest,
  WalletUpdateRequest
}