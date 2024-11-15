import { Hono } from "hono";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { requestId } from "hono/request-id";

import { LoggerVariables } from "@/middlewares/logger.ts";
import { logger } from "@/middlewares/logger.ts";
import { handleError } from "@/lib/errors.ts";

export function createRoutes() {
  return new Hono<{ Variables: LoggerVariables }>();
}

export function createApp() {
  return new Hono<{ Variables: LoggerVariables }>()
    .use("*", requestId())
    .use(logger())
    .use(cors())
    .use(etag())
    .onError(handleError);
}
