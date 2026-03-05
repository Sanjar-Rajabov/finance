import * as fs from "fs";
import {MetadataKeys} from "./enums/metadata-keys";
import {getMetadata, hasMetadata} from "reflect-metadata/no-conflict";
import {PostmanModel} from "./interfaces/postman.model";
import {getData} from "./helpers/get-data";
import {postmanAuthGenerator} from "./generators/postman/postman-auth.generator";
import {postmanUrlGenerator} from "./generators/postman/postman-url.generator";
import {postmanBodyGenerator} from "./generators/postman/postman-body.generator";
import {postmanHeaderGenerator} from "./generators/postman/postman-header.generator";
import {postmanResponseGenerator} from "./generators/postman/postman-response.generator";
import {splitCamelCase, ucfirst} from "../utils/str";
import {descriptionGenerator} from "./generators/description.generator";

export class Postman {
  static async generate(controllersPath: string, collection: any) {
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

          let folder: { name: string, item: any[], auth: any, description: string } = {
            name: ucfirst(getMetadata(MetadataKeys.PostmanFolder, controller)),
            item: [],
            auth: postmanAuthGenerator(controller),
            description: descriptionGenerator(controller)
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
                body: postmanBodyGenerator(controller, name),
                description: descriptionGenerator(controller, name)
              }
              folder.item.push({
                name: ucfirst(splitCamelCase(name)),
                request: request,
                response: postmanResponseGenerator(controller, name, request)
              })
            }
          }

          collection.item.push(folder)
        }
      } else if (f.isDirectory()) {
        let folder: PostmanModel = {
          name: ucfirst(path),
          item: []
        }
        await Postman.generate(`${controllersPath}${path}/`, folder)

        collection.item.push(folder)
      }
    }
  }

  private static getMethod(target: any, key: string) {
    return getData(MetadataKeys.Method, target, key).toUpperCase()
  }
}
