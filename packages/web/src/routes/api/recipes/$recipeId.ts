import { createAPIFileRoute } from "@tanstack/react-start/api";

// Mock data
const mockRecipes = [
  {
    id: 1,
    code: "01",
    title: "豚の角煮",
    category: { id: 1, name: "肉料理", slug: "meat" },
    sourceUrl: "https://www.irisohyama.co.jp/kitchen/cooker/recipe/3l/recipe01/",
    ingredients: [
      { id: 1, name: "豚バラ肉" },
      { id: 2, name: "長ねぎ" },
      { id: 3, name: "しょうが" },
      { id: 4, name: "酒" },
      { id: 5, name: "みりん" },
      { id: 6, name: "しょうゆ" },
      { id: 7, name: "砂糖" },
    ],
  },
  {
    id: 2,
    code: "02",
    title: "肉じゃが",
    category: { id: 1, name: "肉料理", slug: "meat" },
    sourceUrl: "https://www.irisohyama.co.jp/kitchen/cooker/recipe/3l/recipe02/",
    ingredients: [
      { id: 8, name: "牛肉" },
      { id: 9, name: "じゃがいも" },
      { id: 10, name: "玉ねぎ" },
      { id: 11, name: "にんじん" },
      { id: 12, name: "しらたき" },
    ],
  },
  {
    id: 3,
    code: "09",
    title: "鯖のみそ煮",
    category: { id: 3, name: "魚料理", slug: "fish" },
    sourceUrl: "https://www.irisohyama.co.jp/kitchen/cooker/recipe/3l/recipe09/",
    ingredients: [
      { id: 13, name: "鯖" },
      { id: 14, name: "みそ" },
      { id: 7, name: "砂糖" },
      { id: 4, name: "酒" },
      { id: 3, name: "しょうが" },
    ],
  },
  {
    id: 4,
    code: "15",
    title: "筑前煮",
    category: { id: 2, name: "鶏肉料理", slug: "chicken" },
    sourceUrl: "https://www.irisohyama.co.jp/kitchen/cooker/recipe/3l/recipe15/",
    ingredients: [
      { id: 15, name: "鶏もも肉" },
      { id: 16, name: "ごぼう" },
      { id: 11, name: "にんじん" },
      { id: 17, name: "れんこん" },
      { id: 18, name: "たけのこ" },
      { id: 19, name: "こんにゃく" },
    ],
  },
  {
    id: 5,
    code: "16",
    title: "チキンカレー",
    category: { id: 5, name: "カレー", slug: "curry" },
    sourceUrl: "https://www.irisohyama.co.jp/kitchen/cooker/recipe/3l/recipe16/",
    ingredients: [
      { id: 15, name: "鶏もも肉" },
      { id: 10, name: "玉ねぎ" },
      { id: 11, name: "にんじん" },
      { id: 9, name: "じゃがいも" },
      { id: 20, name: "カレールー" },
    ],
  },
  {
    id: 6,
    code: "20",
    title: "ポトフ",
    category: { id: 6, name: "スープ系", slug: "soup" },
    sourceUrl: "https://www.irisohyama.co.jp/kitchen/cooker/recipe/3l/recipe20/",
    ingredients: [
      { id: 21, name: "ソーセージ" },
      { id: 22, name: "キャベツ" },
      { id: 9, name: "じゃがいも" },
      { id: 11, name: "にんじん" },
      { id: 10, name: "玉ねぎ" },
    ],
  },
  {
    id: 7,
    code: "25",
    title: "豚汁",
    category: { id: 6, name: "スープ系", slug: "soup" },
    sourceUrl: "https://www.irisohyama.co.jp/kitchen/cooker/recipe/3l/recipe25/",
    ingredients: [
      { id: 1, name: "豚バラ肉" },
      { id: 23, name: "大根" },
      { id: 11, name: "にんじん" },
      { id: 16, name: "ごぼう" },
      { id: 19, name: "こんにゃく" },
      { id: 24, name: "豆腐" },
      { id: 14, name: "みそ" },
    ],
  },
];

export const APIRoute = createAPIFileRoute("/api/recipes/$recipeId")({
  GET: async ({ params }) => {
    const recipeId = parseInt(params.recipeId, 10);
    const recipe = mockRecipes.find((r) => r.id === recipeId);

    if (!recipe) {
      return new Response(JSON.stringify({ message: "Recipe not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return Response.json(recipe);
  },
});
