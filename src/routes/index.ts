import e from "express";
import express, {Request, Response} from "express";
import {api} from "./api";
import {dashboard} from "./dashboard";
import {ResponseHelper} from "../utils/response.helper";
import {errorHandler} from "../http/middleware/error.handler";
import env from "../utils/env";
import PostmanController from "../http/controllers/postman.controller";
import {frontend} from "./frontend";
import {localeMiddleware} from "../http/middleware/locale.middleware";

export function router(app: e.Router): e.Router {
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(localeMiddleware)

  app.use('/api/', api(e.Router()))
  app.use('/dashboard/', dashboard(e.Router()))
  app.use('/frontend/', frontend(e.Router()))

  if (env('APP_ENV') === 'local') {
    app.get('/postman/generate-collection', PostmanController.generateCollection)
  }

  app.use((req: Request, res: Response, next) => {
    ResponseHelper.error(res, 'Cannot find route with path ' + req.path, 404)
  })

  app.use(errorHandler)

  return app
}
