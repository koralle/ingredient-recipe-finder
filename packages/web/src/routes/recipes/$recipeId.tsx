import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, ExternalLink, ChefHat } from "lucide-react";

export const Route = createFileRoute("/recipes/$recipeId")({
  component: RecipeDetailPage,
});

interface Recipe {
  id: number;
  code: string;
  title: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  sourceUrl?: string;
  ingredients: { id: number; name: string }[];
}

type PageState =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; recipe: Recipe };

function RecipeDetailPage() {
  const { recipeId } = Route.useParams();
  const [state, setState] = useState<PageState>({ status: "loading" });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error("レシピが見つかりませんでした");
        }
        const recipe = (await response.json()) as Recipe;
        setState({ status: "success", recipe });
      } catch (error) {
        setState({ status: "error", error: error as Error });
      }
    };

    fetchRecipe();
  }, [recipeId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            to="/"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="ホームに戻る"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">レシピ詳細</h1>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Loading */}
        {state.status === "loading" && (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">読み込み中...</p>
          </div>
        )}

        {/* Error */}
        {state.status === "error" && (
          <div
            className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
            role="alert"
          >
            <p className="text-red-600 mb-4">{state.error.message}</p>
            <Link
              to="/"
              className="inline-block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              ホームに戻る
            </Link>
          </div>
        )}

        {/* Success */}
        {state.status === "success" && (
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Recipe Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-3">
                {state.recipe.category.name}
              </span>
              <h2 className="text-3xl font-bold mb-2">{state.recipe.title}</h2>
              <p className="text-orange-100">
                レシピNo. {state.recipe.code}
              </p>
            </div>

            {/* Ingredients */}
            <section className="px-6 py-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ChefHat size={20} className="text-orange-500" />
                材料
              </h3>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {state.recipe.ingredients.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    className="px-3 py-2 bg-orange-50 text-orange-800 rounded-lg text-sm"
                  >
                    {ingredient.name}
                  </li>
                ))}
              </ul>
            </section>

            {/* Source Link */}
            {state.recipe.sourceUrl && (
              <section className="px-6 py-6">
                <a
                  href={state.recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  <ExternalLink size={18} />
                  アイリスオーヤマ公式レシピを見る
                </a>
              </section>
            )}
          </article>
        )}
      </main>
    </div>
  );
}
