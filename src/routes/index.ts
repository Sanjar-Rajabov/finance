import e from "express";
import express, {Request, Response} from "express";
import {api} from "./api";
import {ResponseHelper} from "../utils/response.helper";
import {errorHandler} from "../http/middleware/error.handler";
import env from "../utils/env";
import ApiDocsController from "../http/controllers/api-docs.controller";
import {localeMiddleware} from "../http/middleware/locale.middleware";
import swaggerUi from "swagger-ui-express"

export function router(app: e.Router): e.Router {
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(localeMiddleware)

  app.use('/api/', api(e.Router()))

  if (env('APP_ENV') === 'local') {
    app.get('/api-docs/postman', ApiDocsController.postman)
    app.use('/api-docs/swagger', swaggerUi.serve)
    app.get('/api-docs/swagger', ApiDocsController.swagger)
  }

  app.use((req: Request, res: Response, next) => {
    ResponseHelper.error(res, 'Cannot find route with path ' + req.path, 404)
  })

  app.use(errorHandler)

  return app
}
