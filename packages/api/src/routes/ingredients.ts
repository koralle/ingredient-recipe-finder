import { Hono } from "hono";

export const ingredientsApp = new Hono().get("/", (c) => {
  return c.json({
    message: "ingredient",
  });
});
