import {NextFunction, Request, Response} from "express";
import {Folder} from "../postman/decorators/folder";
import {Postman} from "../postman/postman";
import {Get} from "../postman/decorators/methods";
import env from "../helpers/env";

@Folder('Postman', 'postman')
export default class PostmanController {

  @Get('generate-collection')
  static async generateCollection(req: Request, res: Response, next: NextFunction) {
    try {
      const result = {
        collection: {
          info: {
            name: env('APP_NAME'),
            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          item: [],
          variable: [
            {
              key: 'baseUrl',
              value: env('APP_URL'),
              type: 'string'
            }
          ]
        }
      }

      await Postman.generate('./src/controllers/', result.collection.item)


      return res.send(result)
    } catch (error) {
      next(error);
    }
  }
}
