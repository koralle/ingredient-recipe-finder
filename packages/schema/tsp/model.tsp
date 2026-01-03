import "./scalar.tsp";

model Category {
  id: Id;
  name: string;
  slug: string;
}

model Ingredient {
  id: Id;

  @minLength(1)
  @maxLength(100)
  name: string;
}

model Recipe {
  id: Id;
  code: string;
  title: string;
  category: Category;
  sourceUrl?: string;
  ingredients: Ingredient[];
}

model RecipeSummary {
  id: Id;
  code: string;
  title: string;
  categoryName: string;
}
