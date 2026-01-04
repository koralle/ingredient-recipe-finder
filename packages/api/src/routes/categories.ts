import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { categories } from "../db";

export const categoriesApp = new Hono<{ Bindings: { DB: D1Database } }>().get("/", async (c) => {
  const db = drizzle(c.env.DB)

  const allCategories = await db.select().from(categories).all()

  return c.json({
    categories: allCategories
  });
});
