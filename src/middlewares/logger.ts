import { logger as honoLogger } from "hono/logger";
import { createMiddleware } from "hono/factory";
import { pino } from "pino";
import pretty from "pino-pretty";
import env from "@/env.ts";

const pinoLogger = pino(
  { level: env?.LOG_LEVEL },
  env?.DENO_ENV === "production" ? undefined : pretty(),
);

export function logger() {
  return createMiddleware((c, next) => {
    const requestLogger = pinoLogger.child({ requestId: c.get("requestId") });
    c.set("logger", requestLogger);
    return honoLogger((str: string, ...rest: string[]) => {
      requestLogger.info(str, ...rest);
    })(c, next);
  });
}

export type LoggerVariables = {
  logger: pino.Logger;
};
