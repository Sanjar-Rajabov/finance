import {NextFunction, Request, Response} from "express";
import {ResponseHelper} from "../../helpers/response.helper";
import Wallet from "../../entities/wallet";
import {WalletCreateRequest, WalletUpdateRequest} from "../../requests/wallet.request";
import {GetByIdRequest} from "../../requests/common-requests";
import {Get} from "../../postman/decorators/methods";
import {Folder} from "../../postman/decorators/folder";

@Folder('Test')
class WalletController {

  @Get('/')
  static async getAll(req: Request, res: Response) {
    const wallets = await Wallet.find()

    return ResponseHelper.success(res, wallets)
  }

  @Get('/:id')
  static async getOne(req: GetByIdRequest, res: Response, next: NextFunction) {
    try {
      const wallet = await Wallet.findOneOrFail({
        where: {
          id: +req.params.id
        }
      });

      ResponseHelper.success(res, wallet);
    } catch (error) {
      next(error)
    }
  }

  static async create(req: WalletCreateRequest, res: Response, next: NextFunction) {
    try {
      const wallet = Wallet.create({...req.body})
      await wallet.save()

      return ResponseHelper.success(res, wallet)
    } catch (error) {
      next(error)
    }
  }

  static async update(req: WalletUpdateRequest, res: Response, next: NextFunction) {
    try {
      const wallet = await Wallet.findOneByOrFail({
        id: +req.params.id
      })

      await wallet.save({
        data: req.body
      })

      return ResponseHelper.success(res, wallet)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: GetByIdRequest, res: Response, next: NextFunction) {
    try {
      const wallet = await Wallet.findOneByOrFail({
        id: +req.params.id
      });

      await wallet.remove();

      return ResponseHelper.success(res, null);
    } catch (error) {
      next(error);
    }
  }
}

export default WalletController
