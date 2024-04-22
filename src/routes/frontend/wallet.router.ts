import {Router} from "express";
import WalletController from "../../http/controllers/api/wallet.controller";

export function walletRouter(app: Router) {
  app.get('', WalletController.getAll)
  app.get('/:id', WalletController.getOne)
  app.post('', WalletController.create)
  app.post('/:id', WalletController.update)
  app.delete('/:id', WalletController.delete)

  return app
}
