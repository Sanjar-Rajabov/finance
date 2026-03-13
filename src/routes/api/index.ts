import e from "express";
import express, {Request, Response} from "express";
import {walletRouter} from "./wallet.router";
import {ResponseHelper} from "../../utils/response.helper";
import {errorHandler} from "../../http/middleware/error.handler";

export function api(app: e.Router) {
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use('/wallet/', walletRouter(express.Router()))

  app.use((req: Request, res: Response, next) => {
    ResponseHelper.error(res, 'Cannot find route with path ' + req.path, 404)
  })

  app.use(errorHandler)

  return app
}
