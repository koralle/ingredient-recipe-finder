import { Hono } from "hono";
import { categoriesApp } from "./routes/categories";

export const app = new Hono()
  .basePath("/api")
  .get("/", (c) => c.json({ message: "Hello, world!" }))
  .route("/categories", categoriesApp);
