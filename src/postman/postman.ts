import * as fs from "fs";
import {MetadataKeys} from "./enums/metadata-keys";
import {getMetadata, hasMetadata} from "reflect-metadata/no-conflict";
import {PostmanModel} from "./interfaces/postman.model";
import {getData} from "./helpers/get-data";
import {postmanAuthGenerator} from "./helpers/postman-auth.generator";
import {postmanUrlGenerator} from "./helpers/postman-url.generator";
import {postmanBodyGenerator} from "./helpers/postman-body.generator";
import {postmanHeaderGenerator} from "./helpers/postman-header.generator";
import {postmanResponseGenerator} from "./helpers/postman-response.generator";
import {splitCamelCase, ucfirst} from "../helpers/str";

export class Postman {
  static async generate(controllersPath: string, collection: Array<any>) {
    const paths = fs.readdirSync(controllersPath)

    for (let path of paths) {
      let f = fs.lstatSync(controllersPath + path)
      if (f.isFile()) {

        let items = await import(`.${controllersPath.replace('src/', '') + path}`)

        for (let key in items) {
          let controller = items[key]

          if (!hasMetadata(MetadataKeys.PostmanFolder, controller)) {
            continue
          }


          let folder: { name: string, item: any[], auth: any } = {
            name: ucfirst(getMetadata(MetadataKeys.PostmanFolder, controller)),
            item: [],
            auth: postmanAuthGenerator(controller)
          }

          let properties = Object.getOwnPropertyNames(controller)

          for (let name of properties) {
            let property = controller[name]

            if (property instanceof Function && hasMetadata(`${name}.${MetadataKeys.Method}`, controller)) {
              let request = {
                method: this.getMethod(controller, name),
                header: postmanHeaderGenerator(controller, name),
                url: postmanUrlGenerator(controller, name),
                auth: postmanAuthGenerator(controller, name),
                body: postmanBodyGenerator(controller, name)
              }
              folder.item.push({
                name: ucfirst(splitCamelCase(name)),
                request: request,
                response: postmanResponseGenerator(controller, name, request)
              })
            }
          }

          collection.push(folder)
        }
      } else if (f.isDirectory()) {
        let folder: PostmanModel = {
          name: ucfirst(path),
          item: []
        }
        await Postman.generate(`${controllersPath}${path}/`, folder.item)

        collection.push(folder)
      }
    }
  }

  private static getMethod(target: any, key: string) {
    return getData(MetadataKeys.Method, target, key).toUpperCase()
  }

}
