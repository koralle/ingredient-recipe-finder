import { Hono } from "hono";
import { recipesRouter } from "./routes/recipes";
import { ingredientsRouter } from "./routes/ingredients";
import { categoriesRouter } from "./routes/categories";

const app = new Hono<{ Bindings: CloudflareBindings }>();

// API routes
app.route("/api/recipes", recipesRouter);
app.route("/api/ingredients", ingredientsRouter);
app.route("/api/categories", categoriesRouter);

// Health check
app.get("/api/health", (c) => c.json({ status: "ok" }));

export default app;
export { app };
