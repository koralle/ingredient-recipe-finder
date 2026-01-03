import { Hono } from "hono";

export const categoriesApp = new Hono().get("/", (c) => {
  return c.json({
    message: "category",
  });
});
