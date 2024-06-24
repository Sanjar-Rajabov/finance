import * as dotenv from "dotenv";

const env = (key: string, onNull: any = null) => {
  return process.env[key] || onNull;
}

dotenv.config();


export default env