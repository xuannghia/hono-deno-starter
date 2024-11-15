import { z } from "zod";

const EnvSchema = z.object({
  DENO_ENV: z.string().default("production"),
  LOG_LEVEL: z.enum([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
    "silent",
  ]).default("info"),
});

const { error, data: env } = EnvSchema.safeParse(Deno.env.toObject());

if (error) {
  console.error("Invalid env");
  console.error(error.flatten());
  Deno.exit(1);
}

export default env;
