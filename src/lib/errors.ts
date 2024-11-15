import { Context } from "hono";

const HTTP_STATUS_CODES = [
  200,
  201,
  204,
  301,
  302,
  304,
  400,
  401,
  403,
  404,
  409,
  500,
  502,
  504,
] as const;

type HttpStatusCode = typeof HTTP_STATUS_CODES[number];

class HttpError<T extends unknown> extends Error {
  public status: HttpStatusCode = 500;
  constructor(message: string, readonly data?: T) {
    super(message);
  }
}

export class BadRequestError<T extends unknown> extends HttpError<T> {
  override status: HttpStatusCode = 400;
}

export class UnauthorizedError extends HttpError<undefined> {
  override status: HttpStatusCode = 401;
}

export class ForbiddenError extends HttpError<undefined> {
  override status: HttpStatusCode = 403;
}

export class NotFoundError extends HttpError<undefined> {
  override status: HttpStatusCode = 404;
}

export const handleError = (e: unknown, c: Context) => {
  if (e instanceof HttpError) {
    if (e.status >= 500) console.error(e);
    return c.json({
      message: e.message,
      data: e.data,
    }, e.status);
  }
  c.get("logger").error(e);
  return c.json({
    message: "Internal Server Error",
  }, 500);
};
