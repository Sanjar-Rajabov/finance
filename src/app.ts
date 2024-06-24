import e from "express";
import "reflect-metadata"
import db from "./database/data-source";
import env from "./utils/env";
import {seed} from "./database/seeders";
import {router} from "./routes";

const app: e.Express = e();
const url = env('APP_URL', 'http://localhost:3000')
const port = env('APP_PORT', 3000);

app.use('/', router(e.Router()))

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
  if (env('APP_ENV') === 'local') {
    console.log(`[server]: Get postman collection at ${url}/postman/generate-collection`)
  }
})
