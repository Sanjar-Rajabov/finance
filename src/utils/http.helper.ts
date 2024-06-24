import axios, {AxiosInstance} from "axios";

export class HttpHelper {
  static instance(
    url: string,
    headers: object = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  ): AxiosInstance {
    return axios.create({
      baseURL: url,
      headers: headers
    })
  }
}
