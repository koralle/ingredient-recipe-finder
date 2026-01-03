import { createAPIFileRoute } from "@tanstack/react-start/api";

// Mock data - will be replaced with actual DB queries
const mockRecipes = [
  { id: 1, code: "01", title: "豚の角煮", categoryName: "肉料理" },
  { id: 2, code: "02", title: "肉じゃが", categoryName: "肉料理" },
  { id: 3, code: "09", title: "鯖のみそ煮", categoryName: "魚料理" },
  { id: 4, code: "15", title: "筑前煮", categoryName: "鶏肉料理" },
  { id: 5, code: "16", title: "チキンカレー", categoryName: "カレー" },
  { id: 6, code: "20", title: "ポトフ", categoryName: "スープ系" },
  { id: 7, code: "25", title: "豚汁", categoryName: "スープ系" },
];

// Recipe search by ingredients
const recipeIngredients: Record<number, string[]> = {
  1: ["豚バラ肉", "長ねぎ", "しょうが", "酒", "みりん", "しょうゆ", "砂糖"],
  2: ["牛肉", "じゃがいも", "玉ねぎ", "にんじん", "しらたき"],
  3: ["鯖", "みそ", "砂糖", "酒", "しょうが"],
  4: ["鶏もも肉", "ごぼう", "にんじん", "れんこん", "たけのこ", "こんにゃく"],
  5: ["鶏もも肉", "玉ねぎ", "にんじん", "じゃがいも", "カレールー"],
  6: ["ソーセージ", "キャベツ", "じゃがいも", "にんじん", "玉ねぎ"],
  7: ["豚バラ肉", "大根", "にんじん", "ごぼう", "こんにゃく", "豆腐", "みそ"],
};

export const APIRoute = createAPIFileRoute("/api/recipes/search")({
  POST: async ({ request }) => {
    const body = await request.json();
    const { ingredients, matchAll = false } = body as {
      ingredients: string[];
      matchAll?: boolean;
    };

    const results = mockRecipes.filter((recipe) => {
      const recipeIngs = recipeIngredients[recipe.id] || [];

      if (matchAll) {
        // AND検索: すべての材料を含む
        return ingredients.every((ing) =>
          recipeIngs.some((ri) => ri.includes(ing) || ing.includes(ri))
        );
      } else {
        // OR検索: いずれかの材料を含む
        return ingredients.some((ing) =>
          recipeIngs.some((ri) => ri.includes(ing) || ing.includes(ri))
        );
      }
    });

    return Response.json({
      recipes: results,
      totalCount: results.length,
    });
  },
});
