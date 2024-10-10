import {PaginationRequest} from "../http/requests/common-requests";

export interface Pagination {
  current: number;
  previous: number;
  next: number;
  perPage: number;
  totalPage: number
  totalItem: number
}


export interface PaginationResponse<T> {
  pagination: Pagination
  list: T;
}

export const getPaginationResponse = function <T>(data: T[], page: number, limit: number, total_count: number): PaginationResponse<T[]> {
  let responseBody: PaginationResponse<T[]> = {
    pagination: {
      current: page,
      previous: 0,
      next: 0,
      perPage: limit,
      totalPage: Math.ceil(total_count / limit),
      totalItem: total_count,
    },
    list: data,
  }

  if (!data || data.length === 0)
    return responseBody;

  responseBody.pagination.current = page;
  responseBody.pagination.perPage = limit;
  responseBody.pagination.totalItem = total_count;
  responseBody.pagination.totalPage = Math.ceil(total_count / limit);
  responseBody.pagination.previous = (page > 1) ? page - 1 : 0;
  responseBody.pagination.next = (total_count >= page * limit) ? page + 1 : 0;
  return responseBody;
}

export function getPaginationParams(params: PaginationRequest) {
  return [+(params.page ?? 1), +(params.limit ?? 20)]
}