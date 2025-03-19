import { mutation } from "./_generated/server"; //
import { v } from "convex/values";

export const insertRecipes = mutation({
    args: {
        title: v.string(),
        image: v.string(),
        cookingTime: v.number(),
        instructions: v.array(v.string()),
        calories: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("recipes", {
            ...args,
            createdAt: Date.now(),
        });
    },
});
