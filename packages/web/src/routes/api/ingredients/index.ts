import { createAPIFileRoute } from "@tanstack/react-start/api";

// Mock ingredients
const mockIngredients = [
  { id: 1, name: "豚バラ肉" },
  { id: 2, name: "長ねぎ" },
  { id: 3, name: "しょうが" },
  { id: 4, name: "酒" },
  { id: 5, name: "みりん" },
  { id: 6, name: "しょうゆ" },
  { id: 7, name: "砂糖" },
  { id: 8, name: "牛肉" },
  { id: 9, name: "じゃがいも" },
  { id: 10, name: "玉ねぎ" },
  { id: 11, name: "にんじん" },
  { id: 12, name: "しらたき" },
  { id: 13, name: "鯖" },
  { id: 14, name: "みそ" },
  { id: 15, name: "鶏もも肉" },
  { id: 16, name: "ごぼう" },
  { id: 17, name: "れんこん" },
  { id: 18, name: "たけのこ" },
  { id: 19, name: "こんにゃく" },
  { id: 20, name: "カレールー" },
  { id: 21, name: "ソーセージ" },
  { id: 22, name: "キャベツ" },
  { id: 23, name: "大根" },
  { id: 24, name: "豆腐" },
];

export const APIRoute = createAPIFileRoute("/api/ingredients")({
  GET: async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");

    let filtered = mockIngredients;
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = mockIngredients.filter((ing) =>
        ing.name.toLowerCase().includes(searchLower)
      );
    }

    return Response.json({
      ingredients: filtered,
    });
  },
});
