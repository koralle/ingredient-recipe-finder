import { Hono } from "hono";
import { logger } from "hono/logger";
import { categoriesApp } from "./routes/categories";
import { ingredientsApp } from "./routes/ingredients";
import { recipesApp } from "./routes/recipes";

const app = new Hono()
  .basePath("/api")
  .use(logger())
  .get("/health", (c) => c.json({ status: "ok" }))
  .route("/categories", categoriesApp)
  .route("/ingredients", ingredientsApp)
  .route("/recipes", recipesApp);

export default app;
export { app };
