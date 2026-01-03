import "@typespec/http";
import "@typespec/openapi3";

using TypeSpec.Http;

@service({
  title: "Recipe Finder API",
  version: "1.0.0",
})
namespace RecipeFinder;

// ========================================
// Models
// ========================================

model Category {
  id: int32;
  name: string;
  slug: string;
}

model Ingredient {
  id: int32;
  name: string;
}

model Recipe {
  id: int32;
  code: string;
  title: string;
  category: Category;
  sourceUrl?: string;
  ingredients: Ingredient[];
}

model RecipeSummary {
  id: int32;
  code: string;
  title: string;
  categoryName: string;
}

// ========================================
// Request/Response Models
// ========================================

model SearchByIngredientsRequest {
  /** 検索する材料名のリスト */
  ingredients: string[];
  /** true: すべての材料を含む (AND), false: いずれかの材料を含む (OR) */
  matchAll?: boolean = false;
}

model SearchByIngredientsResponse {
  recipes: RecipeSummary[];
  totalCount: int32;
}

model RecipeListResponse {
  recipes: RecipeSummary[];
  totalCount: int32;
}

model IngredientListResponse {
  ingredients: Ingredient[];
}

// ========================================
// API Routes
// ========================================

@route("/api/recipes")
namespace Recipes {
  @get
  @summary("レシピ一覧を取得")
  op list(): RecipeListResponse;

  @get
  @route("/{id}")
  @summary("レシピ詳細を取得")
  op get(@path id: int32): Recipe | NotFoundError;

  @post
  @route("/search")
  @summary("材料からレシピを検索")
  op searchByIngredients(
    @body request: SearchByIngredientsRequest
  ): SearchByIngredientsResponse;
}

@route("/api/ingredients")
namespace Ingredients {
  @get
  @summary("材料一覧を取得（オートコンプリート用）")
  op list(@query search?: string): IngredientListResponse;
}

@route("/api/categories")
namespace Categories {
  @get
  @summary("カテゴリ一覧を取得")
  op list(): Category[];
}

// ========================================
// Error Models
// ========================================

@error
model NotFoundError {
  @statusCode statusCode: 404;
  message: string;
}
