import { z } from "zod";

import {
  checkHealth,
  throwBadRequestError,
  throwUnexpectedError,
} from "@/modules/health/health.service.ts";

import { query } from "@/middlewares/validator.ts";
import { createRoutes } from "@/lib/create.ts";

const PongQuerySchema = z.object({ pong: z.string() });

export const healthRoutes = createRoutes().basePath("/health")
  .get("/", async (c) => {
    const health = await checkHealth();
    return c.json(health);
  })
  .get("/ping", query(PongQuerySchema), (c) => {
    const { pong } = c.req.valid("query");
    return c.json({ pong });
  })
  .get("/error", (c) => {
    c.get("logger").debug({ message: "This is an error" });
    throwUnexpectedError();
    return c.json({ message: "This should not be reached" });
  })
  .get("/bad-request", (c) => {
    throwBadRequestError();
    return c.json({ message: "This should not be reached" });
  });
