import { sValidator } from "@hono/standard-validator";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import * as v from "valibot";
import { recipes } from "../db";

const searchRecipeByIdRequestSchema = v.object({
  ingredients: v.pipe(v.array(v.string()), v.minLength(1), v.maxLength(10)),
});

export const recipesApp = new Hono<{ Bindings: { DB: D1Database } }>()
  .post("/search", sValidator("json", searchRecipeByIdRequestSchema), async (c) => {
    // const data = c.req.valid('json')

    return c.json({
      recipes: [],
    });
  })
  .get("/", async (c) => {
    const db = drizzle(c.env.DB);

    const allRecipes = await db.select().from(recipes).all();

    return c.json({
      recipes: allRecipes,
    });
  })
  .get("/:id", async (c) => {
    const db = drizzle(c.env.DB);
    const recipeId = c.req.param("id");

    // TODO: Number()はまずい
    const recipe = await db
      .select()
      .from(recipes)
      .where(eq(recipes.id, Number(recipeId)));

    return c.json({
      recipe: recipe,
    });
  });
