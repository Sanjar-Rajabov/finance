import express, {Request, Response} from "express"
import walletRouter from "./wallet.router";
import {errorHandler} from "../middleware/error.handler";
import {ResponseHelper} from "../helpers/response.helper";
import PostmanController from "../controllers/postman.controller";

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Hello a')
})

router.use('/wallet', walletRouter)

router.get('/postman/generate-collection', PostmanController.generateCollection)

router.use((req, res, next) => {
  ResponseHelper.error(res, 'Cannot find route with path ' + req.path, 404)
})

router.use(errorHandler)

export default router
