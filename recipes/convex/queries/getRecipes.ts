import { query } from "../_generated/server";

export const getRecipes = query(async ({ db }) => {
    return await db.query("recipes").collect();
});
