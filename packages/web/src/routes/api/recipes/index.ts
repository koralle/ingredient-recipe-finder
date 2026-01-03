import { createAPIFileRoute } from "@tanstack/react-start/api";

// Mock data
const mockRecipes = [
  { id: 1, code: "01", title: "豚の角煮", categoryName: "肉料理" },
  { id: 2, code: "02", title: "肉じゃが", categoryName: "肉料理" },
  { id: 3, code: "09", title: "鯖のみそ煮", categoryName: "魚料理" },
  { id: 4, code: "15", title: "筑前煮", categoryName: "鶏肉料理" },
  { id: 5, code: "16", title: "チキンカレー", categoryName: "カレー" },
  { id: 6, code: "20", title: "ポトフ", categoryName: "スープ系" },
  { id: 7, code: "25", title: "豚汁", categoryName: "スープ系" },
];

export const APIRoute = createAPIFileRoute("/api/recipes")({
  GET: async () => {
    return Response.json({
      recipes: mockRecipes,
      totalCount: mockRecipes.length,
    });
  },
});
