import {Router} from "express";
import WalletController from "../controllers/api/wallet.controller";
import {createValidator} from "express-joi-validation";
import {getByIdJoi, paginationJoi} from "../validation/common-validations";
import {createWalletJoi, updateWalletJoi} from "../validation/wallet";

const walletRouter = Router()
const validator = createValidator({
  passError: true
});

walletRouter.get('', validator.params(paginationJoi), WalletController.getAll)
walletRouter.get('/:id', validator.params(getByIdJoi), WalletController.getOne)
walletRouter.post('', validator.body(createWalletJoi), WalletController.create)
walletRouter.post('/:id', validator.params(getByIdJoi), validator.body(updateWalletJoi), WalletController.update)
walletRouter.delete('/:id', validator.params(getByIdJoi), WalletController.delete)

export default walletRouter