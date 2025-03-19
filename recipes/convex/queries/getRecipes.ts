import { query } from "../_generated/server"; //

export const getRecipes = query({
    handler: async (ctx) => {
        return await ctx.db.query("recipes").collect();
    },
});
