import {NextFunction, Request, Response} from "express";
import env from "../../utils/env";
import {formatDate} from "../../utils/date";
import swaggerUi from "swagger-ui-express";
import {Folder} from "../../api-docs/decorators/folder";
import {Get} from "../../api-docs/decorators/methods";
import {Postman} from "../../api-docs/postman";
import Swagger from "../../api-docs/swagger";

@Folder('API Docs', 'api-docs')
export default class ApiDocsController {
  @Get('postman')
  static async postman(req: Request, res: Response, next: NextFunction) {
    try {
      const result = {
        collection: {
          info: {
            name: env('APP_NAME'),
            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
            createdAt: formatDate(new Date()),
            updatedAt: formatDate(new Date())
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

      await Postman.generate('./src/http/controllers/', result.collection)

      return res.send(result)
    } catch (error) {
      next(error);
    }
  }

  static async swagger(req: any, res: any) {
    try {
      const result: object = await new Swagger().setup(env('APP_NAME'))

      return res.send(swaggerUi.generateHTML(result))
    } catch (error: any) {
      console.log(error)
      return
    }
  }
}
