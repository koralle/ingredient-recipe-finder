import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ChefHat, UtensilsCrossed } from "lucide-react";

export const Route = createFileRoute("/")({ component: HomePage });

type SearchState =
  | { status: "empty" }
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "ideal"; recipes: RecipeSummary[] };

interface RecipeSummary {
  id: number;
  code: string;
  title: string;
  categoryName: string;
}

type MatchMode = "all" | "any";

function HomePage() {
  const [searchState, setSearchState] = useState<SearchState>({
    status: "empty",
  });
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [matchMode, setMatchMode] = useState<MatchMode>("any");

  const handleAddIngredient = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !selectedIngredients.includes(trimmed)) {
      setSelectedIngredients([...selectedIngredients, trimmed]);
      setInputValue("");
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleSearch = async () => {
    if (selectedIngredients.length === 0) return;

    setSearchState({ status: "loading" });

    try {
      const response = await fetch("/api/recipes/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: selectedIngredients,
          matchAll: matchMode === "all",
        }),
      });

      if (!response.ok) {
        throw new Error("検索に失敗しました");
      }

      const data = (await response.json()) as { recipes: RecipeSummary[] };
      setSearchState({ status: "ideal", recipes: data.recipes });
    } catch (error) {
      setSearchState({ status: "error", error: error as Error });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-12 h-12 text-orange-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              レシピ検索
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            冷蔵庫にある材料から作れるレシピを見つけよう
          </p>

          {/* Search Form */}
          <form
            role="search"
            aria-label="材料からレシピを検索"
            className="bg-white rounded-2xl shadow-lg p-6 text-left"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            {/* Ingredient Input */}
            <div className="mb-4">
              <label
                htmlFor="ingredient-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                材料を入力
              </label>
              <div className="flex gap-2">
                <input
                  id="ingredient-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="例: 鶏肉、玉ねぎ、にんじん..."
                  aria-describedby="search-hint"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                >
                  追加
                </button>
              </div>
              <p id="search-hint" className="mt-1 text-sm text-gray-500">
                材料名を入力してEnterまたは「追加」ボタンで追加
              </p>
            </div>

            {/* Selected Ingredients Tags */}
            {selectedIngredients.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  選択中の材料:
                </p>
                <div className="flex flex-wrap gap-2" role="list">
                  {selectedIngredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      role="listitem"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                    >
                      {ingredient}
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(ingredient)}
                        className="ml-1 w-5 h-5 rounded-full bg-orange-200 hover:bg-orange-300 flex items-center justify-center transition-colors"
                        aria-label={`${ingredient}を削除`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Match Mode */}
            <fieldset className="mb-6">
              <legend className="text-sm font-medium text-gray-700 mb-2">
                検索モード
              </legend>
              <div className="flex gap-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="matchMode"
                    value="any"
                    checked={matchMode === "any"}
                    onChange={() => setMatchMode("any")}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-gray-700">
                    いずれかの材料を含む（OR検索）
                  </span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="matchMode"
                    value="all"
                    checked={matchMode === "all"}
                    onChange={() => setMatchMode("all")}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-gray-700">
                    すべての材料を含む（AND検索）
                  </span>
                </label>
              </div>
            </fieldset>

            {/* Search Button */}
            <button
              type="submit"
              disabled={selectedIngredients.length === 0}
              className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              レシピを検索
            </button>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 px-6 max-w-5xl mx-auto">
        {/* Empty State */}
        {searchState.status === "empty" && (
          <div className="text-center py-12">
            <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              材料を入力して検索してください
            </p>
          </div>
        )}

        {/* Loading State */}
        {searchState.status === "loading" && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">検索中...</p>
          </div>
        )}

        {/* Error State */}
        {searchState.status === "error" && (
          <div
            className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
            role="alert"
          >
            <p className="text-red-600 mb-4">{searchState.error.message}</p>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              再試行
            </button>
          </div>
        )}

        {/* Ideal State - Results */}
        {searchState.status === "ideal" && (
          <div>
            <div
              role="status"
              aria-live="polite"
              className="mb-6 text-gray-600"
            >
              {searchState.recipes.length}件のレシピが見つかりました
            </div>

            {searchState.recipes.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  条件に合うレシピが見つかりませんでした
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchState.recipes.map((recipe) => (
                  <a
                    key={recipe.id}
                    href={`/recipes/${recipe.id}`}
                    className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-100"
                  >
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded mb-2">
                      {recipe.categoryName}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      レシピNo. {recipe.code}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
