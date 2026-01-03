import { Hono } from "hono";
import type {
  Recipe,
  RecipeSummary,
  RecipeListResponse,
  SearchByIngredientsRequest,
  SearchByIngredientsResponse,
} from "@recipe-finder/schema";

// TODO: Replace with actual DB queries when db package is connected
const mockRecipes: RecipeSummary[] = [
  { id: 1, code: "01", title: "豚の角煮", categoryName: "肉料理" },
  { id: 2, code: "02", title: "肉じゃが", categoryName: "肉料理" },
  { id: 3, code: "09", title: "鯖のみそ煮", categoryName: "魚料理" },
  { id: 4, code: "15", title: "筑前煮", categoryName: "鶏肉料理" },
  { id: 5, code: "16", title: "チキンカレー", categoryName: "カレー" },
];

export const recipesRouter = new Hono();

// GET /api/recipes - レシピ一覧
recipesRouter.get("/", (c) => {
  const response: RecipeListResponse = {
    recipes: mockRecipes,
    totalCount: mockRecipes.length,
  };
  return c.json(response);
});

// GET /api/recipes/:id - レシピ詳細
recipesRouter.get("/:id", (c) => {
  const id = parseInt(c.req.param("id"), 10);
  const recipe = mockRecipes.find((r) => r.id === id);

  if (!recipe) {
    return c.json({ statusCode: 404, message: "Recipe not found" }, 404);
  }

  // Mock full recipe
  const fullRecipe: Recipe = {
    id: recipe.id,
    code: recipe.code,
    title: recipe.title,
    category: { id: 1, name: recipe.categoryName, slug: "meat" },
    sourceUrl: `https://www.irisohyama.co.jp/kitchen/cooker/recipe/3l/recipe${recipe.code}/`,
    ingredients: [
      { id: 1, name: "豚バラ肉" },
      { id: 2, name: "長ねぎ" },
    ],
  };

  return c.json(fullRecipe);
});

// POST /api/recipes/search - 材料からレシピを検索
recipesRouter.post("/search", async (c) => {
  const body = await c.req.json<SearchByIngredientsRequest>();
  const { ingredients, matchAll = false } = body;

  // TODO: Implement actual search logic with DB
  // For now, return all recipes as mock
  const results = mockRecipes.filter(() => {
    // Mock: return all for demo
    return true;
  });

  const response: SearchByIngredientsResponse = {
    recipes: results,
    totalCount: results.length,
  };

  return c.json(response);
});
