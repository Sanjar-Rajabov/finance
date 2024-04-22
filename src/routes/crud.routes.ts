import e from "express";

export function crudRoutes(app: e.Router, controller: any) {
  app.get('/', controller.getAll)
  app.get('/:id', controller.getOne)
  app.post('/', controller.create)
  app.post('/:id', controller.update)
  app.delete('/:id', controller.delete)

  return app
}