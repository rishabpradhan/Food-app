import { query } from "../_generated/server";

export const getVideoRecipes = query(async ({ db }) => {
  return await db.query("videoRecipes").collect();
});
