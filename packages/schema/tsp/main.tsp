import "@typespec/http";
import "@typespec/openapi3";

import "./error.tsp";
import "./model.tsp";
import "./scalar.tsp";

using Http;

@service({
  title: "Recipe Finder API",
})
namespace RecipeFinder;

model SearchByIngredientsRequest {
  /** 検索する材料名のリスト */
  @minItems(1)
  @maxItems(10)
  ingredients: string[];

  /** true: すべての材料を含む (AND), false: いずれかの材料を含む (OR) */
  matchAll?: boolean = false;
}

@route("/api/recipes")
namespace Recipes {
  @get
  @summary("レシピ一覧を取得")
  op list(): {
    @statusCode statusCode: 200;
    @body recipes: RecipeSummary[];
  } | {
    @statusCode statusCode: 400;
    @body error: BadRequestError;
  } | {
    @statusCode statusCode: 500;
    @body error: InternalServerError;
  };

  @get
  @route("/{id}")
  @summary("レシピ詳細を取得")
  op get(@path id: Id):
    | {
        @statusCode statusCode: 200;
        @body recipe: Recipe;
      }
    | {
        @statusCode statusCode: 404;
        @body error: NotFoundError;
      }
    | {
        @statusCode statusCode: 400;
        @body error: BadRequestError;
      }
    | {
        @statusCode statusCode: 500;
        @body error: InternalServerError;
      };

  @post
  @route("/search")
  @summary("材料からレシピを検索")
  op searchByIngredients(@body request: SearchByIngredientsRequest): {
    @statusCode statusCode: 200;
    @body recipes: RecipeSummary[];
  } | {
    @statusCode statusCode: 400;
    @body error: BadRequestError;
  } | {
    @statusCode statusCode: 500;
    @body error: InternalServerError;
  };
}

@route("/api/ingredients")
namespace Ingredients {
  @get
  @summary("材料一覧を取得（オートコンプリート用）")
  op list(@query search?: string): {
    @statusCode statusCode: 200;
    @body ingredients: Ingredient[];
  } | {
    @statusCode statusCode: 400;
    @body error: BadRequestError;
  } | {
    @statusCode statusCode: 500;
    @body error: InternalServerError;
  };
}

@route("/api/categories")
namespace Categories {
  @get
  @summary("カテゴリ一覧を取得")
  op list(): {
    @statusCode statusCode: 200;
    @body categories: Category[];
  } | {
    @statusCode statusCode: 400;
    @body error: BadRequestError;
  } | {
    @statusCode statusCode: 500;
    @body error: InternalServerError;
  };
}
