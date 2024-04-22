import e from "express";
import {walletRouter} from "./wallet.router";

export function frontend(app: e.Router): e.Router {
  app.use('/wallet/', walletRouter(app))

  return app
}
