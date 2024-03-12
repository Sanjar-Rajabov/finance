import e from "express";

export interface ValidatedBodyRequest<T> extends e.Request {
  body: T
}
