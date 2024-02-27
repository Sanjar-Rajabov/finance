import express, {Express} from "express";
import router from "./routes/app";
import "reflect-metadata"
import db from "./data-source";

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', router)

db.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
