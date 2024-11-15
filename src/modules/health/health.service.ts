import env from "@/env.ts";
import { BadRequestError } from "@/lib/errors.ts";

export const checkHealth = () => {
  if (!env) throw new Error("Server is unhealthy");
  return Promise.resolve({
    message: "Server is healthy",
  });
};

export const throwUnexpectedError = () => {
  throw new Error("Unexpected error");
};

export const throwBadRequestError = () => {
  throw new BadRequestError("Bad Request");
};
