import {Router} from "express";
import WalletController from "../http/controllers/api/wallet.controller";
import {createValidator} from "express-joi-validation";
import {getByIdJoi, paginationJoi} from "../http/validation/common-validations";
import {createWalletJoi, updateWalletJoi} from "../http/validation/wallet";

export function walletRouter(app: Router) {
  const validator = createValidator({
    passError: true
  });

  app.get('', validator.params(paginationJoi), WalletController.getAll)
  app.get('/:id', validator.params(getByIdJoi), WalletController.getOne)
  app.post('', validator.body(createWalletJoi), WalletController.create)
  app.post('/:id', validator.params(getByIdJoi), validator.body(updateWalletJoi), WalletController.update)
  app.delete('/:id', validator.params(getByIdJoi), WalletController.delete)

  return app
}
