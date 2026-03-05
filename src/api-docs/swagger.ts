import * as fs from "node:fs";
import {Stats} from "node:fs";
import {getMetadata, hasMetadata} from "reflect-metadata/no-conflict";
import {ucfirst} from "../utils/str";
import {MetadataKeys} from "./enums/metadata-keys";
import {descriptionGenerator} from "./generators/description.generator";
import {getData} from "./helpers/get-data";
import {mapType} from "./helpers/type";
import generateParams from "./generators/swagger/parameter.generator";
import generateBody from "./generators/swagger/body.generator";
import generateEndpoint from "./generators/swagger/endpoint.generator";
import generateSecurity from "./generators/swagger/security.generator";
import generateResponse from "./generators/swagger/response.generator";
import path from "node:path";

type SwaggerOptions = {
  description?: string | undefined,
  controllersPath?: string | undefined,
  DTOsPath?: string | undefined
}

export default class Swagger {
  async setup(appName: string, options?: SwaggerOptions) {
    const result: any = {
      openapi: "3.0.4",
      info: {
        title: appName,
        description: options?.description
      },
    }

    const defaultControllersPath: string = path.join(process.cwd(), '/src/http/controllers/')

    result.tags = await this.generateTags(options?.controllersPath || defaultControllersPath)
    result.paths = await this.generatePaths(options?.controllersPath || defaultControllersPath)
    result.components = await this.generateComponents(options?.DTOsPath || path.join(process.cwd(), '/src/structures/dto'))

    console.log(result)

    return result
  }

  private getSecuritySchemes() {
    return {
      BasicAuth: {
        type: "http",
        scheme: "basic"
      },
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    };
  }

  private async generatePaths(controllersPath: string): Promise<object> {
    let controllers: any = {}
    const paths: string[] = await fs.promises.readdir(controllersPath)

    for (let item of paths) {
      let f: Stats = await fs.promises.lstat(path.join(controllersPath, item))
      if (f.isFile()) {
        let items: any = await import(path.join(controllersPath, item))

        for (let key in items) {
          let controller: any = items[key]

          const folderMetadata: string | undefined = getMetadata(MetadataKeys.PostmanFolder, controller)

          if (!folderMetadata) {
            continue
          }

          const properties: string[] = Object.getOwnPropertyNames(controller)

          for (let name of properties) {
            let property: any = controller[name]

            if (property instanceof Function && hasMetadata(`${name}.${MetadataKeys.Method}`, controller)) {
              let methodMetadata: string = getData(MetadataKeys.Method, controller, name)

              let body: object | undefined = undefined
              if (['POST', 'PUT', 'PATCH'].includes(methodMetadata)) {
                body = generateBody(controller, name)
              }

              let endpoint: string = generateEndpoint(controller, name)
              controllers[endpoint] = {
                ...controllers[endpoint],
                [methodMetadata.toLowerCase()]: {
                  summary: name,
                  description: descriptionGenerator(controller),
                  tags: [ucfirst(folderMetadata)],
                  security: generateSecurity(controller, name),
                  parameters: generateParams(controller, name),
                  requestBody: body,
                  responses: generateResponse(controller, name)
                }
              }
            }
          }
        }
      } else if (f.isDirectory()) {
        const res: object = await this.generatePaths(path.join(controllersPath, item))
        controllers = {...controllers, ...res}
      }
    }

    return controllers
  }

  private async generateTags(controllersPath: string): Promise<object[]> {
    const tags: object[] = []
    const paths: string[] = await fs.promises.readdir(controllersPath)

    for (let item of paths) {
      let f: Stats = await fs.promises.lstat(path.join(controllersPath, item))
      if (f.isFile()) {
        let items: any = await import(path.join(controllersPath, item))

        for (let key in items) {
          let controller: any = items[key]

          if (!hasMetadata(MetadataKeys.PostmanFolder, controller)) {
            continue
          }

          let tag: object = {
            name: ucfirst(getMetadata(MetadataKeys.PostmanFolder, controller)),
            description: descriptionGenerator(controller)
          }
          tags.push(tag)
        }
      } else if (f.isDirectory()) {
        const res: object[] = await this.generateTags(path.join(controllersPath, item))
        tags.push(...res)
      }
    }

    return tags
  }

  private async generateComponents(DTOsPath: string) {
    let components: any = {
      schemas: {},
      securitySchemes: this.getSecuritySchemes()
    }

    function getFilesRecursively(dir: string): string[] {
      const files: string[] = []
      fs.readdirSync(dir).forEach((file: string) => {
        const filePath = `${dir}/${file}`
        const stat: Stats = fs.statSync(filePath)
        if (stat.isDirectory()) {
          files.push(...getFilesRecursively(filePath))
        } else {
          files.push(filePath)
        }
      })
      return files
    }

    const files: string[] = getFilesRecursively(DTOsPath)

    for (const file of files) {
      let importItems: any = await import(file)

      for (let key in importItems) {
        const item: any = importItems[key]

        if (typeof item === 'function') {
          const instance = new item()

          const properties: string[] = Object.keys(instance)
          components.schemas[item.name] = {
            type: "object",
            properties: Object.fromEntries(
              properties.map((prop: string) => [prop, {
                type: mapType(typeof instance[prop]),
                example: instance[prop]
              }])
            ),
            xml: {
              name: item.name
            }
          }
        }
      }
    }

    return components
  }
}
