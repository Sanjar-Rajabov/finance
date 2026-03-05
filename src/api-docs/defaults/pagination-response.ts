import {ResponseHelper} from "../../utils/response.helper";
import {Response} from "../decorators/response";
import {StatusCodes} from "http-status-codes";

export function PaginationResponse(data: any) {

  let result = ResponseHelper.successObject({
    pagination: {
      current: 1,
      previous: 0,
      next: 2,
      perPage: 20,
      totalPage: 10,
      totalItem: 100
    },
    list: []
  })

  for (let i = 0; i < 20; i++) {
    result.data.list.push(data)
  }

  return Response([
    {
      statusCode: StatusCodes.OK,
      body: result,
      name: 'OK'
    }
  ])
}
