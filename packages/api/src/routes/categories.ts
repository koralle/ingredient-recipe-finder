import { Hono } from "hono";
import type { Category } from "@recipe-finder/schema";

// TODO: Replace with actual DB queries
const mockCategories: Category[] = [
  { id: 1, name: "肉料理", slug: "meat" },
  { id: 2, name: "鶏肉料理", slug: "chicken" },
  { id: 3, name: "魚料理", slug: "fish" },
  { id: 4, name: "野菜料理", slug: "vegetable" },
  { id: 5, name: "カレー", slug: "curry" },
  { id: 6, name: "スープ系", slug: "soup" },
  { id: 7, name: "鍋料理", slug: "hotpot" },
  { id: 8, name: "スイーツ", slug: "sweets" },
  { id: 9, name: "その他", slug: "other" },
];

export const categoriesRouter = new Hono();

// GET /api/categories - カテゴリ一覧
categoriesRouter.get("/", (c) => {
  return c.json(mockCategories);
});
