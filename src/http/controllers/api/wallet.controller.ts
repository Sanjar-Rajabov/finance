import {NextFunction, Request, Response} from "express";
import {ResponseHelper} from "../../../helpers/response.helper";
import Wallet from "../../../database/entities/wallet";
import {WalletCreateRequest, WalletUpdateRequest} from "../../requests/wallet.request";
import {GetByIdRequest} from "../../requests/common-requests";
import {Delete, Get, Post, Put} from "../../../postman/decorators/methods";
import {Folder} from "../../../postman/decorators/folder";
import {AuthBearer} from "../../../postman/decorators/auth-bearer";
import {Body} from "../../../postman/decorators/body";
import {PaginationQuery} from "../../../postman/defaults/pagination-query";
import {WalletDto} from "../../../structures/dto/wallet.dto";
import {PaginationResponse} from "../../../postman/defaults/pagination-response";
import {ResponseOk} from "../../../postman/defaults/response-ok";
import {ResponseCreated} from "../../../postman/defaults/response-created";
import {ResponseEmpty} from "../../../postman/defaults/response-empty";
import {Description} from "../../../postman/decorators/description";

@Folder('Wallet')
@AuthBearer()
@Description('test folder desc')
export default class WalletController {

  @Get('/')
  @PaginationQuery()
  @PaginationResponse(new WalletDto)
  @Description('test method desc')
  static async getAll(req: Request, res: Response) {
    const wallets = await Wallet.find()

    return ResponseHelper.success(res, wallets)
  }

  @Get('/:id')
  @ResponseOk(new WalletDto)
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

  @Post('/')
  @Body({
    name: 'wallet 1',
    balance: 0
  })
  @ResponseCreated(new WalletDto())
  static async create(req: WalletCreateRequest, res: Response, next: NextFunction) {
    try {
      const wallet = Wallet.create({...req.body})
      await wallet.save()

      return ResponseHelper.success(res, wallet)
    } catch (error) {
      next(error)
    }
  }

  @Put('/:id')
  @Body({
    name: 'wallet 1',
    balance: 0
  }, 'formdata')
  @ResponseOk(new WalletDto)
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

  @Delete('/:id')
  @ResponseEmpty()
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
