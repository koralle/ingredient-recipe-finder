import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { ingredients } from "../db";

export const ingredientsApp = new Hono<{ Bindings: { DB: D1Database } }>().get("/", async (c) => {
  const db = drizzle(c.env.DB);

  const allIngredients = await db.select().from(ingredients).all();

  return c.json({
    ingredients: allIngredients,
  });
});
