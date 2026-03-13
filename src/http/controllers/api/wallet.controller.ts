import {Response} from "express";
import {ResponseHelper} from "../../../utils/response.helper";
import Wallet from "../../../database/entities/wallet";
import {WalletCreateRequest, WalletUpdateRequest} from "../../requests/wallet.request";
import {
  GetByIdRequest,
  GetOneRequest,
  PaginationRequest,
  ValidatedBodyRequest,
  ValidatedParamsRequest,
  ValidatedQueryRequest
} from "../../requests/common-requests";
import {Delete, Get, Post, Put} from "../../../api-docs/decorators/methods";
import {Folder} from "../../../api-docs/decorators/folder";
import {AuthBearer} from "../../../api-docs/decorators/auth-bearer";
import {Body} from "../../../api-docs/decorators/body";
import {PaginationQuery} from "../../../api-docs/defaults/pagination-query";
import {WalletResponse} from "../../../structures/responses/wallet.response";
import {PaginationResponse} from "../../../api-docs/defaults/pagination-response";
import {ResponseOk} from "../../../api-docs/defaults/response-ok";
import {ResponseCreated} from "../../../api-docs/defaults/response-created";
import {ResponseEmpty} from "../../../api-docs/defaults/response-empty";
import {Description} from "../../../api-docs/decorators/description";
import {validate} from "../../validation/validate";
import {getOneValidation, paginationValidation} from "../../validation/common-validations";
import {walletValidation} from "../../validation/wallet";

@Folder('Wallet', '/api/wallet')
@AuthBearer()
@Description('test folder desc')
export default class WalletController {
  @Get('/')
  @PaginationQuery()
  @PaginationResponse(new WalletResponse)
  @Description('test method desc')
  static async getAll(req: ValidatedQueryRequest<PaginationRequest>, res: Response) {
    try {
      validate(paginationValidation, req.query)

      const wallets: Wallet[] = await Wallet.find()

      return ResponseHelper.success(res, wallets)
    } catch (error) {
      return ResponseHelper.catchError(res, error)
    }
  }

  @Get('/:id')
  @ResponseOk(new WalletResponse)
  static async getOne(req: ValidatedParamsRequest<GetOneRequest>, res: Response) {
    try {
      validate(getOneValidation, req.params)

      const wallet: Wallet = await Wallet.findOneOrFail({
        where: {
          id: +req.params.id
        }
      });

      return ResponseHelper.success(res, wallet);
    } catch (error) {
      return ResponseHelper.catchError(res, error)
    }
  }

  @Post('/')
  @Body({
    name: 'wallet 1',
    balance: 0
  })
  @ResponseCreated(new WalletResponse())
  static async create(req: ValidatedBodyRequest<WalletCreateRequest>, res: Response) {
    try {
      validate(walletValidation, req.body)

      const wallet: Wallet = Wallet.create({...req.body})
      await wallet.save()

      return ResponseHelper.success(res, wallet)
    } catch (error) {
      return ResponseHelper.catchError(res, error)
    }
  }

  @Put('/:id')
  @Body({
    name: 'wallet 1',
    balance: 0
  }, 'raw')
  @ResponseOk(new WalletResponse)
  static async update(req: ValidatedBodyRequest<WalletUpdateRequest>, res: Response) {
    try {
      validate(walletValidation, req.body)

      const wallet: Wallet = await Wallet.findOneByOrFail({
        id: +req.params.id
      })

      await wallet.save({
        data: req.body
      })

      return ResponseHelper.success(res, wallet)
    } catch (error) {
      return ResponseHelper.catchError(res, error)
    }
  }

  @Delete('/:id')
  @ResponseEmpty()
  static async delete(req: GetByIdRequest, res: Response) {
    try {
      validate(getOneValidation, req.params)

      const wallet: Wallet = await Wallet.findOneByOrFail({
        id: +req.params.id
      });

      await wallet.remove();

      return ResponseHelper.success(res, null);
    } catch (error) {
      return ResponseHelper.catchError(res, error);
    }
  }
}
