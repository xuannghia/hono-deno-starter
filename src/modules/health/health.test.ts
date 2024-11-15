import { expect } from "@std/expect";
import { testClient } from "hono/testing";
import { healthRoutes } from "@/modules/health/health.routes.ts";
import { createApp } from "@/lib/create.ts";

const client = testClient(createApp().route("/", healthRoutes));

Deno.test("Test health module", async (t) => {
  await t.step("GET /health", async () => {
    const response = await client.health.$get();
    expect(response.status).toBe(200);
  });

  await t.step("GET /health/ping", async () => {
    const response = await client.health.ping.$get({ query: { pong: "pong" } });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ pong: "pong" });
  });

  await t.step("GET /health/error", async () => {
    const response = await client.health.error.$get();
    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body.message).toEqual("Internal Server Error");
  });

  await t.step("GET /health/bad-request", async () => {
    const response = await client.health["bad-request"].$get();
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.message).toEqual("Bad Request");
  });
});
