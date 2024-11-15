import type { ZodSchema } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";

const validate = <T extends ZodSchema, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T,
) => {
  return zValidator(target, schema, (result, c) => {
    if (result.success) {
      return result.data;
    }
    const error = result.error.format();
    return c.json({
      message: error._errors[0] || `Invalid ${target} data`,
      data: error,
    }, 400);
  });
};

export const body = <T extends ZodSchema>(schema: T) =>
  validate("json", schema);
export const query = <T extends ZodSchema>(schema: T) =>
  validate("query", schema);
export const param = <T extends ZodSchema>(schema: T) =>
  validate("param", schema);
export const form = <T extends ZodSchema>(schema: T) =>
  validate("form", schema);
