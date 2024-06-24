import express, {Request, Response, Router} from "express"
import {walletRouter} from "./frontend/wallet.router";
import {errorHandler} from "../http/middleware/error.handler";
import {ResponseHelper} from "../utils/response.helper";

export function api(app: Router) {
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use('/wallet/', walletRouter(express.Router()))

  app.use((req: Request, res: Response, next) => {
    ResponseHelper.error(res, 'Cannot find route with path ' + req.path, 404)
  })

  app.use(errorHandler)

  return app
}
