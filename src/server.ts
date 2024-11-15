import { createApp } from "@/lib/create.ts";

import { healthRoutes } from "@/modules/health/health.routes.ts";

export const routes = [
  healthRoutes,
] as const;

const app = createApp().route("/", ...routes);

export type AppType = typeof app;

export default app;
