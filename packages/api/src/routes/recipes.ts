import { Hono } from "hono";

export const recipesApp = new Hono().get("/", (c) => {
  return c.json({
    message: "recipe",
  });
});
