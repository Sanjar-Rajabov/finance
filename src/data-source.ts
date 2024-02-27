import {DataSource} from "typeorm";
import env from "./helpers/env";

const db = new DataSource({
  type: "postgres",
  host: env('DB_HOST', 'localhost'),
  port: env('DB_PORT', 5432),
  username: env('DB_USER', 'postgres'),
  password: env('DB_PASS', 'password'),
  database: env('DB_NAME', 'finance'),
  synchronize: false,
  entities: ['src/entities/*.ts']
})

export default db