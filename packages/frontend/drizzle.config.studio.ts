import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "drizzle-kit";

function getLocalD1DB() {
  try {
    const basePath = resolve(".wrangler/state/v3/d1/miniflare-D1DatabaseObject");
    const dbFile = readdirSync(basePath, { encoding: "utf-8", recursive: true }).find((f) =>
      f.endsWith(".sqlite"),
    );

    if (!dbFile) {
      throw new Error(`.sqlite file not found in ${basePath}`);
    }

    const url = resolve(basePath, dbFile);
    return url;
  } catch (err) {
    console.log(`Error  ${err}`);
  }
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: getLocalD1DB() ?? "",
  },
});
