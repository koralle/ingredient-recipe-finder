import { Hono } from "hono";
import type { Ingredient, IngredientListResponse } from "@recipe-finder/schema";

// TODO: Replace with actual DB queries
const mockIngredients: Ingredient[] = [
  { id: 1, name: "豚バラ肉" },
  { id: 2, name: "鶏もも肉" },
  { id: 3, name: "牛肉" },
  { id: 4, name: "玉ねぎ" },
  { id: 5, name: "にんじん" },
  { id: 6, name: "じゃがいも" },
  { id: 7, name: "大根" },
  { id: 8, name: "ごぼう" },
  { id: 9, name: "しょうが" },
  { id: 10, name: "長ねぎ" },
];

export const ingredientsRouter = new Hono();

// GET /api/ingredients - 材料一覧（オートコンプリート用）
ingredientsRouter.get("/", (c) => {
  const search = c.req.query("search");

  let filtered = mockIngredients;
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = mockIngredients.filter((ing) =>
      ing.name.toLowerCase().includes(searchLower)
    );
  }

  const response: IngredientListResponse = {
    ingredients: filtered,
  };

  return c.json(response);
});
