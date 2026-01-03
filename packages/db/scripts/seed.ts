import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { categories, recipes, ingredients, recipeIngredients } from "../src/schema";
import seedData from "../data/recipes.json";

// 食材名の正規化（検索用）
function normalizeIngredientName(name: string): string {
  return name
    .toLowerCase()
    .replace(/（.*?）/g, "") // 括弧内を削除
    .replace(/\s+/g, "") // スペース削除
    .trim();
}

async function seed() {
  console.log("🌱 Seeding database...");

  const sqlite = new Database("recipe-finder.db");
  const db = drizzle(sqlite);

  // テーブルをクリア
  console.log("  Clearing existing data...");
  db.delete(recipeIngredients).run();
  db.delete(recipes).run();
  db.delete(ingredients).run();
  db.delete(categories).run();

  // カテゴリを挿入
  console.log("  Inserting categories...");
  for (const category of seedData.categories) {
    db.insert(categories)
      .values({
        id: category.id,
        name: category.name,
        slug: category.slug,
      })
      .run();
  }

  // 全レシピから材料を収集してユニークなリストを作成
  const allIngredients = new Set<string>();
  for (const recipe of seedData.recipes) {
    for (const ingredient of recipe.ingredients) {
      allIngredients.add(ingredient);
    }
  }

  // 材料を挿入
  console.log("  Inserting ingredients...");
  const ingredientMap = new Map<string, number>();
  let ingredientId = 1;
  for (const name of allIngredients) {
    db.insert(ingredients)
      .values({
        id: ingredientId,
        name,
        normalizedName: normalizeIngredientName(name),
      })
      .run();
    ingredientMap.set(name, ingredientId);
    ingredientId++;
  }

  // レシピを挿入
  console.log("  Inserting recipes...");
  for (const recipe of seedData.recipes) {
    const result = db
      .insert(recipes)
      .values({
        code: recipe.code,
        title: recipe.title,
        categoryId: recipe.categoryId,
        sourceUrl: recipe.sourceUrl,
      })
      .returning({ id: recipes.id })
      .get();

    // レシピと材料の関連を挿入
    for (const ingredientName of recipe.ingredients) {
      const ingId = ingredientMap.get(ingredientName);
      if (ingId) {
        db.insert(recipeIngredients)
          .values({
            recipeId: result.id,
            ingredientId: ingId,
          })
          .run();
      }
    }
  }

  console.log(`✅ Seeded ${seedData.categories.length} categories`);
  console.log(`✅ Seeded ${allIngredients.size} ingredients`);
  console.log(`✅ Seeded ${seedData.recipes.length} recipes`);

  sqlite.close();
}

seed().catch(console.error);
