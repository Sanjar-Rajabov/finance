import {DataSource} from "typeorm";
import env from "../helpers/env";

const db: DataSource = new DataSource({
  type: "postgres",
  host: env('DB_HOST', 'localhost'),
  port: env('DB_PORT', 5432),
  username: env('DB_USERNAME', 'postgres'),
  password: env('DB_PASSWORD', 'password'),
  database: env('DB_DATABASE', 'finance'),
  synchronize: env('APP_ENV') === 'local',
  entities: [__dirname + '/entities/*.{ts,js}']
})

export default db
