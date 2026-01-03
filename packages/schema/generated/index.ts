// ========================================
// TypeSpec から生成される型定義
// 手動で同期維持（TypeSpec ビルド後に更新）
// ========================================

// Models
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Ingredient {
  id: number;
  name: string;
}

export interface Recipe {
  id: number;
  code: string;
  title: string;
  category: Category;
  sourceUrl?: string;
  ingredients: Ingredient[];
}

export interface RecipeSummary {
  id: number;
  code: string;
  title: string;
  categoryName: string;
}

// Request/Response Types
export interface SearchByIngredientsRequest {
  /** 検索する材料名のリスト */
  ingredients: string[];
  /** true: すべての材料を含む (AND), false: いずれかの材料を含む (OR) */
  matchAll?: boolean;
}

export interface SearchByIngredientsResponse {
  recipes: RecipeSummary[];
  totalCount: number;
}

export interface RecipeListResponse {
  recipes: RecipeSummary[];
  totalCount: number;
}

export interface IngredientListResponse {
  ingredients: Ingredient[];
}

// Error Types
export interface NotFoundError {
  statusCode: 404;
  message: string;
}
