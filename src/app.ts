import express, {Express} from "express";
import {api} from "./routes/api";
import "reflect-metadata"
import db from "./database/data-source";
import PostmanController from "./http/controllers/postman.controller";
import env from "./helpers/env";
import {seed} from "./database/seeders";

const app: Express = express();
const url = env('APP_URL', 'http://localhost:3000')
const port = env('APP_PORT', 3000);

app.use('/api', api(express.Router()))

if (env('APP_ENV') === 'local') {
  app.get('/postman/generate-collection', PostmanController.generateCollection)
}

db.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
    seed().then()
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

app.listen(port, () => {
  console.log(`[server]: Server is running at ${url}`);
})
